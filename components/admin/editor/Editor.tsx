import BlotFormatter from 'quill-blot-formatter';
// #1 import quill-image-uploader
import ImageUploader from 'quill-image-uploader';
import { Dispatch, SetStateAction, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';

import { uploadFile } from '@/utils/services/file.service';

// #2 register module
Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/blotFormatter', BlotFormatter);

interface Props {
	loading?: boolean;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

const formats = [
	'header',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
	// 'imageBlot', // #5 Optinal if using custom formats
	'video',
	'code-block',
	'color',
	'code',
	'align',
	'background',
];

export function RichEditor({ loading, value, setValue }: Props) {
	const ref = useRef<any>(null);

	const modules = useMemo(
		() => ({
			toolbar: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
				[{ size: [] }],
				[
					{
						color: [
							'#f06417',
							'#000000',
							'#e60000',
							'#ff9900',
							'#ffff00',
							'#008a00',
							'#0066cc',
							'#9933ff',
							'#ffffff',
							'#facccc',
							'#ffebcc',
							'#ffffcc',
							'#cce8cc',
							'#cce0f5',
							'#ebd6ff',
							'#bbbbbb',
							'#f06666',
							'#ffc266',
							'#ffff66',
							'#66b966',
							'#66a3e0',
							'#c285ff',
							'#888888',
							'#a10000',
							'#b26b00',
							'#b2b200',
							'#006100',
							'#0047b2',
							'#6b24b2',
							'#444444',
							'#5c0000',
							'#663d00',
							'#666600',
							'#003700',
							'#002966',
							'#3d1466',
							'custom-color',
						],
					},
					{ background: [] },
				], // dropdown with defaults from theme
				[{ align: [] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[
					{ list: 'ordered' },
					{ list: 'bullet' },
					{ indent: '-1' },
					{ indent: '+1' },
				],
				['link', 'image', 'video'],
				['code', 'code-block'],
				['clean'],
			],
			clipboard: {
				// toggle to add extra line breaks when pasting HTML:
				matchVisual: false,
			},
			blotFormatter: {},
			imageUploader: {
				upload: (file: any) => {
					return new Promise((resolve, reject) => {
						const formData = new FormData();
						formData.append('file', file);
						uploadFile(formData)
							.then((res) => {
								resolve(res.url);
							})
							.catch((err) => reject(err));
					});
				},
			},
		}),
		[],
	);

	return loading ? (
		<></>
	) : (
		<ReactQuill
			ref={ref}
			theme="snow"
			modules={modules}
			defaultValue={value}
			formats={formats}
			onChange={setValue}
		/>
	);
}

export function RichEditorBasic({ loading, value, setValue }: Props) {
	const ref = useRef<any>(null);

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		// 'imageBlot', // #5 Optinal if using custom formats
		'code-block',
		'color',
		'code',
		'align',
		'background',
	];

	const modules = useMemo(
		() => ({
			toolbar: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
				[{ size: [] }],
				[{ color: [] }, { background: [] }], // dropdown with defaults from theme
				[{ align: [] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[
					{ list: 'ordered' },
					{ list: 'bullet' },
					{ indent: '-1' },
					{ indent: '+1' },
				],
				['link'],
				['code', 'code-block'],
				['clean'],
			],
			clipboard: {
				// toggle to add extra line breaks when pasting HTML:
				matchVisual: false,
			},
			blotFormatter: {},
		}),
		[],
	);

	return loading ? (
		<></>
	) : (
		<ReactQuill
			ref={ref}
			theme="snow"
			modules={modules}
			defaultValue={value}
			formats={formats}
			onChange={setValue}
		/>
	);
}
