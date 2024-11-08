import Markdown from "@/components/Markdown"

const content = `
# How to use the Admin Dashboard

## Editing Content

Each page corresponding to an individual page has an "Edit" button. Once you modify
the content, you can hit save to propogate the changes to the main site or hit cancel to 
discard your changes.

Edits will propogate to the main site as soon as you hit save. So, be careful to
only save changes that you want to be displayed publicly. If you have just changed
somethig and it hasn't shown up yet, try reloading the page.

## Rich Text

Certain form inputs allow you to use [markdown](https://www.markdownguide.org/basic-syntax/).
This is totally optional and mostly just means you need to add newlines between paragraphs.
In a markdown field, you can use the following shortcuts:

- Use one asterisk to make text \\**italic*\\*
- Use two asterisks to make text \\*\\***bold**\\*\\*
- Links look like this: \\[Google\\](https://www.google.com)
- Use "- " on a new line to make a bullet point

ChatGPT is your friend. Just dump you text in and ask it to "fix this markdown".
`

const Page = () => <Markdown content={content} />

export default Page
