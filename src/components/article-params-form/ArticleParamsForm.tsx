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
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type Props = (newState: ArticleStateType) => void;
interface ArticleParamsFormProps {
	changeArticleStyle: Props;
}

export const ArticleParamsForm = ({
	changeArticleStyle,
}: ArticleParamsFormProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [fontFamilyOption, setFontFamily] = useState(fontFamilyOptions[0]);
	const [fontColor, setFontColor] = useState(fontColors[0]);
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
	const [contentWidth, setContent] = useState(contentWidthArr[0]);
	const [fontSizeOption, setFontSize] = useState(fontSizeOptions[0]);

	const toggleSidebarOpen = () => {
		setSidebarOpen((state: typeof sidebarOpen) => !state);
	};

	const overlayRef = useRef(null);

	useOutsideClickClose({
		isOpen: sidebarOpen,
		rootRef: overlayRef,
		onClose: () => setSidebarOpen(false),
		onChange: setSidebarOpen,
	});

	const handleButtonSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		changeArticleStyle({
			fontFamilyOption,
			fontColor,
			backgroundColor,
			contentWidth,
			fontSizeOption,
		});
	};

	const handleReset = () => {
		setFontFamily(fontFamilyOptions[0]);
		setFontColor(fontColors[0]);
		setBackgroundColor(backgroundColors[0]);
		setContent(contentWidthArr[0]);
		setFontSize(fontSizeOptions[0]);
	};

	return (
		<>
			<ArrowButton isOpen={sidebarOpen} onClick={toggleSidebarOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: sidebarOpen,
				})}
				ref={overlayRef}>
				<form
					className={styles.form}
					onSubmit={handleButtonSubmit}
					onReset={handleReset}>
					<Text as={'h2'} uppercase={true} size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={setFontFamily}
					/>
					<RadioGroup
						name={'radio'}
						options={fontSizeOptions}
						selected={fontSizeOption}
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
						selected={contentWidth}
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
