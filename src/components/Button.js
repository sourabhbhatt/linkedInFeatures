import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styled from 'styled-components/native';
import colors from '../utils/colors';

// Styled Components
const Container = styled(TouchableOpacity)`
  background-color: lightblue;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const IconTextContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`;

const Icon = styled(Text)`
  font-size: 20px;
`;

const Title = styled(Text)`
  font-size: 18px;
  color: ${colors.text};
  font-weight: bold;
  margin-left: 10px;
`;

const RightArrow = styled(Text)`
  font-size: 18px;
  color: ${colors.text};
`;

// Button Component
const Button = ({
  icon = '',
  title = '',
  onPress = () => {},
  style = {},
  titleStyle = {},
  right = true,
}) => {
  return (
    <Container style={style} onPress={onPress}>
      <IconTextContainer>
        <Icon>{icon}</Icon>
        <Title style={titleStyle}>{title}</Title>
      </IconTextContainer>
      {!!right && <RightArrow>{'↠'}</RightArrow>}
    </Container>
  );
};

export default Button;