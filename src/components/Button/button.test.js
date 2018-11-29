import React from "react"
import Button from "."

describe("Button", () => {

	it("should render", () => {	
		const button = shallow(<Button />)
		expect(button.exists()).toBe(true)
	})

	it("should render a TouchableOpacity", () => {
		const button = shallow(<Button />)
		expect(button.find("TouchableOpacity").length).toBe(1)
	})

	it("should render a Text", () => {
		const button = shallow(<Button />)
		console.log(button.find("TouchableOpacity").children().text())
	})

	it("should set the Text inner value to the value prop", () => {
		const button = shallow(<Button value="click" />)
		expect(button.find("Text").text()).toBe("click")
	})

})