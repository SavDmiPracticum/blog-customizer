import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';
import styles from './app.module.scss';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [currentStyle, setCurrentStyle] =
		useState<ArticleStateType>(defaultArticleState);
	const onChangeStyleArticle = (style: ArticleStateType) => {
		setCurrentStyle(style);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentStyle.fontFamilyOption.value,
					'--font-size': currentStyle.fontSizeOption.value,
					'--font-color': currentStyle.fontColor.value,
					'--container-width': currentStyle.contentWidth.value,
					'--bg-color': currentStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm style={currentStyle} onChange={onChangeStyleArticle} />
			<Article />
		</main>
	);
};
