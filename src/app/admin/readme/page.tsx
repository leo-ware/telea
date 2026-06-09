import Markdown from "@/components/Markdown";

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
For the causual user, this mostly just means you need to add newlines between paragraphs.
For the advanced user, you can use this to create rich text formatting.
In a markdown field, you can use the following shortcuts:

- Use one asterisk to make text \\**italic*\\*
- Use two asterisks to make text \\*\\***bold**\\*\\*
- Links look like this: \\[Google\\](https://www.google.com)
- Use "- " on a new line to make a bullet point

You can create headings using hashtags. So, for example, the following input:

\`\`\`markdown
# Heading One

## Heading Two

### Heading Three
\`\`\`

will render as:

# Heading One

## Heading Two

### Heading Three

ChatGPT is your friend. Just dump you text in and ask it to "fix this markdown".
Also, many document editors (like Notion and Google Docs) support markdown exporting.
So, you can create the formatting you want in the text editor, export to markdown,
and then copy/paste the result into the editor.

**Update 6/9/26**: The editor now supports html embedding. You can mention this to
ChatGPT and it will give it a little more flexibility in terms of the formatting
it can do.
`;

const Page = () => <Markdown content={content} />;

export default Page;
