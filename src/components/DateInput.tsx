import {
	Input,
	InputProps,
	Popover,
	PopoverAnchor,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverProps,
	useColorModeValue,
	useDisclosure,
	useToken,
} from "@chakra-ui/react";
import { forwardRef, useEffect } from "react";
import { DayPicker, useInput as useDateInput } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Merge } from "src/types/utilityTypes";

export type DateInputProps = Merge<
	InputProps,
	{
		value: Date | undefined;
		onChange?: (value: Date | undefined) => void;
		format?: string;
		pickerPlacement?: PopoverProps["placement"];
		pickerOffset?: PopoverProps["offset"];
	}
>;

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
	(
		{
			onChange = () => {},
			value,
			format: formatStr,
			pickerPlacement,
			colorScheme = "blackAlpha",
			isRequired,
			isReadOnly,
			isDisabled,
			pickerOffset,
			...props
		},
		ref,
	) => {
		const { inputProps, dayPickerProps, setSelected } = useDateInput({
			format: formatStr,
			defaultSelected: value,
			required: isRequired,
		});
		const primaryColorShade = useColorModeValue(500, 400);
		const [primaryColor, fadedColor] = useToken("colors", [
			`${colorScheme}.${primaryColorShade}`,
			`${colorScheme}.50`,
		]);

		const [cellRadius] = useToken("radii", ["lg"]);

		const {
			onOpen: onPickerOpen,
			onClose: onPickerClose,
			isOpen: pickerIsOpen,
		} = useDisclosure();

		useEffect(() => {
			if (!isReadOnly) {
				setSelected(value);
			}
		}, [value]);

		return (
			<Popover
				placement={pickerPlacement}
				onOpen={onPickerOpen}
				onClose={onPickerClose}
				isOpen={pickerIsOpen}
				offset={pickerOffset}
			>
				<PopoverAnchor>
					<Input
						colorScheme={colorScheme}
						isReadOnly
						{...inputProps}
						{...props}
						isRequired={isRequired}
						isDisabled={isDisabled}
						onFocus={(e) => {
							inputProps.onFocus?.(e);
							props.onFocus?.(e);
							onPickerOpen();
						}}
						ref={ref}
					/>
				</PopoverAnchor>

				<PopoverContent>
					<PopoverArrow />
					<PopoverBody
						css={{
							// We have to define these in `css` because in the `sx` prop, use of
							// "rgba()" colors are incorrectly interpreted as theme tokens rather
							// than raw values.
							"--rdp-accent-color": primaryColor,
							"--rdp-background-color": fadedColor,
							"--rdp-outline": "2px solid var(--rdp-accent-color)",
						}}
						sx={{
							".rdp-day": {
								borderRadius: cellRadius,
							},
						}}
					>
						<DayPicker
							mode="single"
							{...dayPickerProps}
							onDayClick={onChange}
							disabled={isDisabled}
						/>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		);
	},
);

export default DateInput;
