import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ContactSubmission from '@/models/ContactSubmission';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email/email-template.js';

const RESEND_API_KEY = process.env.RESEND_API_KEY
const MAIL_FROM = process.env.MAIL_FROM
const ADMIN_EMAIL = process.env.ADMIN_EMAIL


export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const resend = new Resend(RESEND_API_KEY)

        // Basic validation
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { success: false, error: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        // Update existing submission if email exists, otherwise create new
        const submission = await ContactSubmission.findOneAndUpdate(
            { email: body.email },
            body,
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );

        // TODO: Send email notification to admin
        console.log("Submisson Data: ", submission)

        resend.emails.send({
            from: MAIL_FROM,
            to: ADMIN_EMAIL,
            subject: 'Elv8s new User contact',
            react: EmailTemplate({
                date: new Date(submission.createdAt).toLocaleDateString('en-GB'),
                name: submission.name,
                contact: submission.phone,
                role: submission.role,
                interest: submission.interests,
                message: submission.message
            }),
        });


        return NextResponse.json({ success: true, data: submission }, { status: 201 });
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
