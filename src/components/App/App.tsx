import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import { CSSProperties, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articalState, setArticalState] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articalState.fontFamilyOption.value,
					'--font-size': articalState.fontSizeOption.value,
					'--font-color': articalState.fontColor.value,
					'--container-width': articalState.contentWidth.value,
					'--bg-color': articalState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm changeArticleStyle={setArticalState} />
			<Article />
		</main>
	);
};
