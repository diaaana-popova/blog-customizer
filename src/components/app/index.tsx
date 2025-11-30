import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';
import { PageParameters } from 'src/constants/articleProps';
import './index.scss';
import styles from './index.module.scss';

export const App = () => {

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