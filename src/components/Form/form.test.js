import React from "react";
import { Text } from "react-native";
import Form from ".";
import { TextInput, Button } from "..";
import { shallow } from "enzyme";

describe("Form", () => {
	describe("when form is given initialValues array prop", () => {
		it("should set state equal to initialValues prop", () => {
			const onSubmit = jest.fn();
			const form = shallow(
				<Form
					onSubmit={onSubmit}
					initialValues={[{ id: "1", value: "initialValue" }]}
					renderItems={(values, onChange, onSubmit) => {
						const [first, ...rest] = values;
						return (
							<TextInput
								id="1"
								value={first && first.value}
								onChange={onChange}
							/>
						);
					}}
				/>
			);
			expect(form.state("childValues")[0].value).toBe("initialValue");
		});
		it("should set the value of the render children to the corresponding values in the initialValues array", () => {
			const onSubmit = jest.fn();
			const form = shallow(
				<Form
					onSubmit={onSubmit}
					initialValues={[{ id: "1", value: "initialValue" }]}
					renderItems={(values, onChange, onSubmit) => {
						const [first, ...rest] = values;
						return (
							<TextInput
								id="1"
								value={first && first.value}
								onChange={onChange}
							/>
						);
					}}
				/>
			);
			expect(form.find("TextInput").prop("value")).toBe("initialValue");
		});
	});

	describe("when input value changes", () => {
		it("should update the state to the child's new input value", () => {
			const onSubmit = jest.fn();
			const form = shallow(
				<Form onSubmit={onSubmit}>
					<TextInput id="1" value="initialValue" onChange={() => {}} />
				</Form>
			);
			form.find("TextInput").simulate("change", "newValue");
			expect(form.state("childValues")[0].value).toBe("newValue");
		});
	});

	describe("when there is more than one child", () => {
		describe("when one child's value changes", () => {
			it("should not change the other child's value", () => {
				const onChange = jest.fn();
				const onSubmit = jest.fn();
				const form = shallow(
					<Form onSubmit={onSubmit}>
						<TextInput id="1" value="first" onChange={onChange} />
						<TextInput id="2" value="second" onChange={onChange} />
					</Form>
				);
				form
					.find("TextInput")
					.first()
					.simulate("change", "newValue");
				expect(form.state("childValues")[0].value).toBe("newValue");
				expect(form.state("childValues")[1].value).toBe("second");
			});
		});
	});

	describe("submitting the form", () => {
		it("should call onSubmit prop on submit button press", () => {
			const onSubmit = jest.fn();
			const onChange = jest.fn();
			const form = shallow(
				<Form onSubmit={onSubmit}>
					<TextInput id="1" value="" onChange={onChange} />
					<Button type="submit" value="Submit" />
				</Form>
			);
			form.find("Button").simulate("press");
			expect(onSubmit.mock.calls.length).toBe(1);
		});
		it("should pass all the state to onSubmit", () => {
			const onSubmit = jest.fn();
			const onChange = jest.fn();
			const form = shallow(
				<Form onSubmit={onSubmit}>
					<TextInput id="1" value="first" onChange={onChange} />
					<TextInput id="2" value="second" onChange={onChange} />
					<Button type="submit" value="Submit" />
				</Form>
			);
			form.find("Button").simulate("press");
			expect(onSubmit.mock.calls[0][0]).toMatchObject({
				id: "1",
				value: "first"
			});
			expect(onSubmit.mock.calls[0][1]).toMatchObject({
				id: "2",
				value: "second"
			});
		});
	});
});
