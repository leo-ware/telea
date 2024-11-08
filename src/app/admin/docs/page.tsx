import Markdown from "@/components/Markdown"

const content = `
# Technical Info


I am Leo. I built this website in 2024.
If you need help with something, my permanent email address is leobpware@gmail.com.

## Code

This website was built with Next.js and Tailwind CSS. The 
code is written in Typescript and is publicly available on github at
[https://github.com/leo-ware/telea](https://github.com/leo-ware/telea).
I'm making the code publicly available because it will make it easier for someone to maintain
in the unlikely event that I can't be reached in the future.

## Hosting

This website is hosted on Vercel. This is free and industry standard. The vercel deployment
is under my (Leo's) account. Contact me if there are any issues with this.

I do not control the domain name, teleainsights.com. To my knowledge, this is currently
registered on Squarespace.

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

The database is a Postgres database hosted on Supabase.
I am in the process of migrating to AWS because it's free. I will let
you know when this is done.


## Dependencies

### Email

I am in the process of integrating this with the Telea mailchimp system.
Once this is done, this website will use the Mailchimp API when
user's sign up for the newsletter or when notifications need to be sent to someone from Telea.

### Markdown

Markdown (including this page) is rendered using [react-markdown](https://github.com/remarkjs/react-markdown) 
and styled with tailwind typography.


`
const Page = () => <Markdown content={content} />

export default Page