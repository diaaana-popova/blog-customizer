import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { PageParameters } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	const [parameters, setParameters] = useState<PageParameters>({
		font: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
		fontSize: defaultArticleState.fontSizeOption
	})

	const formSubmit = (newParameters: PageParameters) => {
		setParameters(newParameters);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': parameters.font.value,
					'--font-size': parameters.fontSize.value,
					'--font-color': parameters.fontColor.value,
					'--container-width': parameters.contentWidth.value,
					'--bg-color': parameters.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onReset={formSubmit}
				onSubmit={formSubmit}
				font={parameters.font}
				fontColor={parameters.fontColor}
				backgroundColor={parameters.backgroundColor}
				contentWidth={parameters.contentWidth}
				fontSize={parameters.fontSize}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
