import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions /*defaultArticleState */,
} from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export const ArticleParamsForm = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	/*const [defaultState,setDefaultArticleState] = useState(defaultArticleState);*/
	const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0]);
	const [fontColor, setFontColor] = useState(fontColors[0]);
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
	const [content, setContent] = useState(contentWidthArr[0]);
	const [fontSize, setFontSize] = useState(fontSizeOptions[0]);

	const toggleSidebarOpen = () => {
		setSidebarOpen((state: typeof sidebarOpen) => !state);
	};

	const formMenu = clsx({
		[styles.container]: true,
		[styles.container_open]: sidebarOpen,
	});

	const overlayRef = useRef(null);

	useOutsideClickClose({
		isOpen: sidebarOpen,
		rootRef: overlayRef,
		onClose: () => setSidebarOpen(false),
		onChange: setSidebarOpen,
	});

	return (
		<>
			<div ref={overlayRef} />
			<ArrowButton isOpen={sidebarOpen} onClick={toggleSidebarOpen} />

			<aside className={formMenu}>
				<form className={clsx(styles.form)}>
					<Text as={'h2'} uppercase={true} size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={setFontFamily}
					/>
					<RadioGroup
						name={'radio'}
						options={fontSizeOptions}
						selected={fontSize}
						title={'Размер шрифта'}
						onChange={setFontSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={setBackgroundColor}
					/>
					<Select
						selected={content}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={setContent}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
