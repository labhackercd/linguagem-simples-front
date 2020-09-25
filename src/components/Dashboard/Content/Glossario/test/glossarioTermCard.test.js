import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow} from "enzyme/build";
import GlossarioTermCard from '../glossarioTermCard'
import { mount} from 'enzyme';

it("should render the GlossarioTermCard section", () => {
    const term ={
        "termo": "Abuso de poder econômico",
        "descricao": "Em matéria eleitoral, conduta potencialmente lesiva à normalidade e à legitimidade das eleições que envolve a utilização de grandes quantias de dinheiro para beneficiar, direta ou indiretamente, determinado partido político ou candidato antes e durante o período de campanha."
      };

    const component = mount(<GlossarioTermCard data={term}/>);

    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();

    const buttonTerm = component.find("button");
    buttonTerm.simulate('click');

    component.update();

    const closeButton = component.find("button").find("#closeButton");
    //console.log(closeButton.find("#closeButton").debug())
    closeButton.simulate('click');

});
