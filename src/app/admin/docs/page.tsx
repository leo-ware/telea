import Markdown from "@/components/Markdown"

const content = `
# Technical Info


I am Leo. I built this website in 2024.
If you need help with something, my permanent email address is leobpware@gmail.com.

**Update 2-27/2025:**
Github lfs is being annoying about hosting video files on the free tier. So, just don't fetch these and don't commit to them when you edit the repo.


## Code

This website was built with Next.js and Tailwind CSS. The 
code is written in Typescript and is publicly available on github at
[https://github.com/leo-ware/telea](https://github.com/leo-ware/telea).
I'm making the code publicly available because it will make it easier for someone to maintain
in the unlikely event that I can't be reached in the future.

## Hosting

This website is hosted on Vercel. This is free and industry standard. The vercel deployment
is under my (Leo's) account. Contact me if there are any issues with this.

I do not control the domain name, teleainsights.com. Last time I dealt with this (November 2024), it was 
controlled by Eddie Joffe, whose email was ejoffe@netzonetech.com.

## Authentication

Authenication uses Google OAuth. **Anyone with a Telea email can log in and edit the content of this website.**
This can theoretically be changed if needed. You cannot use Google OAuth with a non-Telea email.
The reaon for this is that this app is registered with the teleainsights google organization, 
and I told them it is for internal use only, which has laxer verification requirements.

There is only one user who can log in without a Telea email, and that is me, Leo. More of these accounts could
be created if needed.

The google oauth credentials are registered with nitin@teleinsights.com. If you need to change them,
you will need access to Nitin's account.

## Database

The database is a Postgres database hosted on Supabase located [here](https://supabase.com/dashboard/project/rbdxrsvwmsbsivvedzyv).
Nitin (nitin@teleinsights.com) has an account on supabase with admin access.

## Dependencies

### Email

I use the Telea mailchimp system to send emails. This happens when a user submits the contact form.
These emails get sent to info@teleinsights.com.

I am not using a documented API for this. I just hit the url endpoint used by the mailchimp
embedded contact us form. This is likely not robust. So, as a backup, messages are copied to
the inbox in the admin dashboard.

I am doing this because this is the only way I could figure out to get this functionality to work for free.
Mailchimp has an upcharge for their official email API.

### Markdown

Markdown (including this page) is rendered using [react-markdown](https://github.com/remarkjs/react-markdown) 
and styled with tailwind typography.


`
const Page = () => <Markdown content={content} />

export default Page