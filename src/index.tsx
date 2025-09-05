import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currentStyle, setCurrentStyle] =
		useState<ArticleStateType>(defaultArticleState);
	const onChangeStyleArticle = (style: ArticleStateType) => {
		setCurrentStyle(style);
	};

	return (
		<main
			className={clsx(styles.main)}
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
