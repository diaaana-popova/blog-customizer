import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, defaultArticleState, OptionType } from 'src/constants/articleProps';
import clsx from "clsx";
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';
import { PageParameters } from 'src/constants/articleProps';

interface TArticleParamsForm extends PageParameters {
	onSubmit: (parameters: PageParameters) => void,
	onReset: (parameters: PageParameters) => void
};

export const ArticleParamsForm = ( props: TArticleParamsForm ) => {

	const [isOpen, setIsOpen] = useState(false);
	const [localFont, setLocalFont] = useState(defaultArticleState.fontFamilyOption);
	const [localFontColor, setLocalFontColor] = useState(defaultArticleState.fontColor);
	const [localBackgroundColor, setLocalBackgroundColor] = useState(defaultArticleState.backgroundColor);
	const [localContentWidth, setLocalContentWidth] = useState(defaultArticleState.contentWidth);
	const [localFontSize, setLocalFontSize] = useState(defaultArticleState.fontSizeOption);

	const asideRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		onClose: () => {},
		onChange: setIsOpen
	})

	const open = () => { setIsOpen(true); }
	const close = () => { setIsOpen(false); }
	const toggle = () => { isOpen ? close() : open(); }

	const fontChange = (option: OptionType) => {
		setLocalFont(option);
	}

	const fontColorChange = (option: OptionType) => {
		setLocalFontColor(option);
	}

	const backgroundColorChange = (option: OptionType) => {
		setLocalBackgroundColor(option);
	}

	const contentWidthChange = (option: OptionType) => {
		setLocalContentWidth(option);
	}

	const fontSizeChange = (option: OptionType) => {
		setLocalFontSize(option);
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.onSubmit({
			font: localFont,
			fontColor: localFontColor,
			backgroundColor: localBackgroundColor,
			contentWidth: localContentWidth,
			fontSize: localFontSize
		});
		close();
	}

	const formReset = () => {
		setLocalFont(defaultArticleState.fontFamilyOption),
		setLocalFontColor(defaultArticleState.fontColor),
		setLocalBackgroundColor(defaultArticleState.backgroundColor),
		setLocalContentWidth(defaultArticleState.contentWidth),
		setLocalFontSize(defaultArticleState.fontSizeOption)
		props.onSubmit({
			font: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSize: defaultArticleState.fontSizeOption
		});
		close();
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside className={clsx(styles.container, {
    			[styles.container_open]: isOpen,
  				})}
				ref={asideRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase={true}>Задайте параметры</Text>
					<Select
						title={'Шрифт'}
						selected={localFont}
						options={fontFamilyOptions}
						onChange={fontChange}>
					</Select>
					<RadioGroup
						name={'Размер шрифта'}
						title={'Размер шрифта'}
						selected={localFontSize}
						options={fontSizeOptions}
						onChange={fontSizeChange}>
					</RadioGroup>
					<Select
						title={'Цвет шрифта'}
						selected={localFontColor}
						options={fontColors}
						onChange={fontColorChange}>
					</Select>
					<Separator />
					<Select
						title={'Цвет фона'}
						selected={localBackgroundColor}
						options={backgroundColors}
						onChange={backgroundColorChange}>
					</Select>
					<Select
						title={'Ширина контента'}
						selected={localContentWidth}
						options={contentWidthArr}
						onChange={contentWidthChange}>
					</Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={formReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
