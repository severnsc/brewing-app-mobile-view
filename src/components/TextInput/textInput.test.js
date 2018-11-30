import React from "react"
import TextInput from "."
import { shallow } from "enzyme"

describe("TextInput", () => {

	describe("when the value changes", () => {

		it("should call the onChange prop", () => {
			const onChange = jest.fn()
			const textInput = shallow(
				<TextInput onChange={onChange} autoFocus={true} />
			)
			textInput.find("TextInput").simulate("changeText")
			expect(onChange.mock.calls.length).toBe(1)
		})

		it("should pass the changed value to onChange", () => {
			const onChange = jest.fn()
			const textInput = shallow(
				<TextInput onChange={onChange} autoFocus={true} />
			)
			textInput.find("TextInput").simulate("changeText", "a")
			expect(onChange.mock.calls[0][0]).toBe("a")
		})

	})

})