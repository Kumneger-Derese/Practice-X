import './texteditor.css';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { EditorContent, useEditor } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  BoldIcon,
  Code,
  Code2,
  FlipVertical2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Redo,
  Strikethrough,
  Undo,
  X,
} from 'lucide-react';
import {
  FaList,
  FaListOl,
  FaListUl,
  FaMinus,
  FaParagraph,
  FaQuoteLeft,
} from 'react-icons/fa6';

import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import java from 'highlight.js/lib/languages/java';

import { createLowlight } from 'lowlight';
const lowlight = createLowlight();

lowlight.register({ javascript });
lowlight.register({ python });
lowlight.register({ html });
lowlight.register({ css });
lowlight.register({ json });
lowlight.register({ java });

const TextEditor = ({ content, onContentChange }) => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
          codeBlock: false,
        }),
        TextStyle,
        Color,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        CodeBlockLowlight.configure({
          lowlight,
          defaultLanguage: 'javascript',
        }),
      ],
      content: content || '<div>Start typing for a new task...</div>',
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onContentChange(html);
      },
    },
    []
  );

  if (!editor) {
    return null;
  }

  return (
    <div className='editor-container prose lg:prose-base  relative mt-8 max-w-none'>
      <div className='flex items-center flex-wrap gap-1 text-black/80  p-2 sticky z-50 top-16 mx-2.5 bg-neutral-400/50 rounded-md '>
        {/* Undo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className={editor.isActive('undo') ? 'is-active' : 'button'}
        >
          <Undo className='size-4' strokeWidth={4} />
        </button>

        {/* Redo */}
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className={editor.isActive('redo') ? 'is-active' : 'button'}
        >
          <Redo className='size-4' strokeWidth={4} />
        </button>

        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : 'button'}
          title='Bold (Ctrl+B)' // Tooltip for accessibility
        >
          <BoldIcon className='size-4' strokeWidth={4} />
        </button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : 'button'}
        >
          <Italic className='size-4' strokeWidth={4} />
        </button>

        {/* Strike */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : 'button'}
        >
          <Strikethrough className='size-4' strokeWidth={4} />
        </button>

        {/* Code */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : 'button'}
        >
          <Code className='size-4' strokeWidth={4} />
        </button>

        {/* bulletList */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : 'button'}
        >
          <FaListUl className='size-4' strokeWidth={4} />
        </button>

        {/* orderedList */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : 'button'}
        >
          <FaListOl className='size-4' strokeWidth={4} />
        </button>

        {/* List */}
        <button
          onClick={() => editor.chain().focus().toggleList().run()}
          className={editor.isActive('list') ? 'is-active' : 'button'}
        >
          <FaList className='size-4' strokeWidth={4} />
        </button>

        {/* Codeblock */}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : 'button'}
          title='Ctr + Alt + C'
        >
          <Code2 className='size-4' strokeWidth={4} />
        </button>

        {/* Paragraph */}
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : 'button'}
        >
          <FaParagraph className='size-4' strokeWidth={4} />
        </button>

        {/* H1 */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : 'button'
          }
        >
          <Heading1 className='size-4' strokeWidth={4} />
        </button>

        {/* H2 */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : 'button'
          }
        >
          <Heading2 className='size-4' strokeWidth={4} />
        </button>

        {/* H3 */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : 'button'
          }
        >
          <Heading3 className='size-4' strokeWidth={4} />
        </button>

        {/* Text align */}
        <div className='inline-flex items-center gap-x-1'>
          <button
            onClick={() => editor.chain().focus().toggleTextAlign('left').run()}
            className={
              editor.isActive({ textAlign: 'left' }) ? 'is-active' : 'button'
            }
            title='Ctr + Shift + L'
          >
            <AlignLeft className='size-4' strokeWidth={4} />
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleTextAlign('center').run()
            }
            className={
              editor.isActive({ textAlign: 'center' }) ? 'is-active' : 'button'
            }
            title='Ctr + Shift + E'
          >
            <AlignCenter className='size-4' strokeWidth={4} />
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleTextAlign('right').run()
            }
            className={
              editor.isActive({ textAlign: 'right' }) ? 'is-active' : 'button'
            }
            title='Ctr + Shift + R'
          >
            <AlignRight className='size-4' strokeWidth={4} />
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleTextAlign('justify').run()
            }
            className={
              editor.isActive({ textAlign: 'justify' }) ? 'is-active' : 'button'
            }
            title='Ctr + Shift + J'
          >
            <AlignJustify className='size-4' strokeWidth={4} />
          </button>
        </div>

        {/* Text Color */}
        <div className='flex gap-x-2 items-center border rounded-md border-gray-50'>
          <input
            type='color'
            onInput={(event) =>
              editor.chain().focus().setColor(event.target.value).run()
            }
            value={editor.getAttributes('textStyle').color || '#000000'}
            className='color-input'
            title='Text Color'
          />
          <button
            onClick={() => editor.chain().focus().unsetColor().run()}
            title='Remove Color'
          >
            <X className='size-4' strokeWidth={3} />
          </button>
        </div>

        {/* Hardbreak */}
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className={editor.isActive('hardBreak') ? 'is-active' : 'button'}
        >
          <FlipVertical2 className='size-4' strokeWidth={4} />
        </button>

        {/* BlockQuote and hr */}
        <div>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : 'button'}
          >
            <FaQuoteLeft className='size-4' strokeWidth={4} />
          </button>

          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={
              editor.isActive('horizontalRule') ? 'is-active' : 'button'
            }
          >
            <FaMinus className='size-4' strokeWidth={4} />
          </button>
        </div>
      </div>

      <EditorContent
        editor={editor}
        className='mt-2.5 min-h-[220px] p-1.5 sm:p-2.5 border border-gray-300 rounded-md'
      />
    </div>
  );
};

export { TextEditor };
