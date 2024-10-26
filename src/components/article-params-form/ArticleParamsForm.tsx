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
	defaultArticleState,
	OptionType,
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
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
	const [state, setState] = useState(defaultArticleState);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const toggleSidebarOpen = () => {
		setSidebarIsOpen((state: typeof sidebarIsOpen) => !state);
	};

	const overlayRef = useRef(null);

	useOutsideClickClose({
		isOpen: sidebarIsOpen,
		rootRef: overlayRef,
		onClose: () => setSidebarIsOpen(false),
		onChange: setSidebarIsOpen,
	});

	const handleButtonSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		changeArticleStyle(state);
	};

	const handleReset = () => {
		setState(defaultArticleState);
		changeArticleStyle(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={sidebarIsOpen} onClick={toggleSidebarOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: sidebarIsOpen,
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
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={handleOnChange('fontFamilyOption')}
					/>
					<RadioGroup
						name={'radio'}
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						title={'Размер шрифта'}
						onChange={handleOnChange('fontSizeOption')}
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={handleOnChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={handleOnChange('backgroundColor')}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={handleOnChange('contentWidth')}
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
