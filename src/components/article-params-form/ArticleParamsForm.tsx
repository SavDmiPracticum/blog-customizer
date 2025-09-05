import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from './hooks/UseOutsideClickClose';

type ArticleParamsFormProps = {
	style: ArticleStateType;
	onChange: (style: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	style,
	onChange,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(style);
	const asideRef = useRef<HTMLElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		onClose: () => setIsOpen(false),
	});

	const handleClickArrow = () => {
		setIsOpen((prev) => !prev);
	};

	const handleReset = () => {
		onChange(defaultArticleState);
		setFormState(defaultArticleState);
		setIsOpen(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onChange(formState);
		setIsOpen(false);
	};

	const handleChange = <K extends keyof ArticleStateType>(
		key: K,
		value: OptionType
	) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClickArrow} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text as='h2' weight={800} size={31} uppercase={true} align='left'>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(value) => handleChange('fontFamilyOption', value)}
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер'
						name='fontSize'
						onChange={(value) => handleChange('fontSizeOption', value)}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(value) => handleChange('fontColor', value)}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(value) => handleChange('backgroundColor', value)}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(value) => handleChange('contentWidth', value)}
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
