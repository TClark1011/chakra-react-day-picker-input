import { useState } from "react";
import { Center, InputGroup, InputRightAddon, VStack } from "@chakra-ui/react";
import DateInput from "./components/DateInput";
import { CalendarIcon } from "@chakra-ui/icons";

function App() {
	const [value, setValue] = useState<Date | undefined>(new Date());

	const commonProps = {
		w: 80,
		value: value,
		onChange: setValue,
	};

	return (
		<Center h="100vh" w="100vw">
			<VStack>
				<DateInput colorScheme="pink" {...commonProps} format="dd/MM/yyyy" />
				<DateInput
					variant="filled"
					pickerPlacement="left"
					{...commonProps}
					format="MM/dd/yyyy"
				/>
				<InputGroup w="80">
					<DateInput
						{...commonProps}
						format="EEEE, do 'of' MMMM, yyyy"
						w="full"
						borderEndRadius={0}
						pickerPlacement="right"
						colorScheme="orange"
						pickerOffset={[0, 57]}
					/>
					<InputRightAddon>
						<CalendarIcon />
					</InputRightAddon>
				</InputGroup>
				<DateInput
					{...commonProps}
					format="EEEE, do 'of' MMMM, yyyy"
					w="full"
					borderEndRadius={0}
					isDisabled
				/>
			</VStack>
		</Center>
	);
}

export default App;
