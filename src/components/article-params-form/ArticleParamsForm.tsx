import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	const;

	return (
		<>
			<ArrowButton isOpen={true} onClick={() => {}} />
			<aside className={clsx(styles.container, styles.container_open)}>
				<form className={clsx(styles.form)}>
					<Text uppercase={true} size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select selected={} options={} title={'Шрифт'} onChange={} />
					<RadioGroup name={} options={} selected={} title={'Размер шрифта'} />
					<Select selected={} options={} title={'Цвет шрифта'} onChange={} />
					<Separator />
					<Select selected={} options={} title={'Цвет фона'} onChange={} />
					<Select
						selected={}
						options={}
						title={'Ширина контента'}
						onChange={}
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
