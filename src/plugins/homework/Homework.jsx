import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"
import styled, { css } from "styled-components"

import Select from 'react-select';

import LessonContext from "~/Contexts/Lesson.context"
import config from "~/config"
import Input from "~/components/Input"
import Flex from "~/components/Flex"
import { serverApi } from "~/utils/api";

import Edit from "./Edit"
import View from "./View"

const Homework = ({ focused, state }) => {

	if (focused){
		return <Edit state={state} />
	} else {
		return <View state={state} />
	}
}

export default Homework
