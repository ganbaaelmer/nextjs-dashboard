'use server';

//To handle type validation
import { z } from 'zod';
//Inserting the data into your database
import { sql } from '@vercel/postgres';
//Revalidate and redirect, clear cache and trigger a new request 
import { revalidatePath } from 'next/cache';
//you also want to redirect the user back to the /dashboard/invoices page
import { redirect } from 'next/navigation';


const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
  });


//-------------------------------CREATE invoice  
  const CreateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function createInvoice(formData: FormData) {
    //To handle type validation
    const { customerId, amount, status } = CreateInvoice.parse({

    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  //Storing values in cents
  const amountInCents = amount * 100;

  //let's create a new date with the format "YYYY-MM-DD" for the invoice's creation date:
  const date = new Date().toISOString().split('T')[0];
  //Inserting the data into your database Postgre
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  //Revalidate and redirect
  revalidatePath('/dashboard/invoices');
  //you also want to redirect the user back to the /dashboard/invoices page
  redirect('/dashboard/invoices');

  // Test it out:
  console.log('typeof rawFormData.amount:  ', typeof customerId);
  console.log('typeof rawFormData.amount:  ', typeof amount);
  console.log('typeof rawFormData.amount:  ', typeof status);
}



//-------------------------------UPDATE invoice
// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


//-------------------------------Delete invoice
export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  }