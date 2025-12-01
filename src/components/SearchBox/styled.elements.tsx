import * as React from 'react';

import { darken, getLuminance, lighten } from 'polished';
import styled from '../../styled-components';
import { MenuItemLabel } from '../SideMenu/styled.elements';

export const SearchWrap = styled.div`
  padding: 5px 0;
`;

export const SearchInput = styled.input.attrs(() => ({
  className: 'search-input',
}))`
  width: calc(100% - ${props => props.theme.spacing.unit * 8}px);
  box-sizing: border-box;
  margin: 0 ${props => props.theme.spacing.unit * 4}px;
  padding: 5px ${props => props.theme.spacing.unit * 2}px 5px
    ${props => props.theme.spacing.unit * 4}px;
  border: 0;
  border-bottom: 1px solid
    ${({ theme }) =>
      (getLuminance(theme.sidebar.backgroundColor) > 0.5 ? darken : lighten)(
        0.1,
        theme.sidebar.backgroundColor,
      )};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: bold;
  font-size: 13px;
  color: ${props => props.theme.sidebar.textColor};
  background-color: transparent;
  outline: none;
`;

export const GlobalSearchInput = styled.input.attrs(() => ({
  className: 'search-input',
}))`
  width: calc(100% - ${props => props.theme.spacing.unit * 8}px);
  box-sizing: border-box;
  margin: 0 ${props => props.theme.spacing.unit * 4}px;
  padding: 10px 15px;
  border: 0;
  border-bottom: 1px solid
    ${({ theme }) =>
      (getLuminance(theme.sidebar.backgroundColor) > 0.5 ? darken : lighten)(
        0.1,
        theme.sidebar.backgroundColor,
      )};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: bold;
  font-size: 13px;
  color: 'black' 
  background-color: transparent;
  outline: none;
  border-radius: 2.5px;
`;

export const SearchIcon = styled((props: { className?: string }) => (
  <svg
    className={props.className}
    version="1.1"
    viewBox="0 0 1000 1000"
    x="0px"
    xmlns="http://www.w3.org/2000/svg"
    y="0px"
  >
    <path d="M968.2,849.4L667.3,549c83.9-136.5,66.7-317.4-51.7-435.6C477.1-25,252.5-25,113.9,113.4c-138.5,138.3-138.5,362.6,0,501C219.2,730.1,413.2,743,547.6,666.5l301.9,301.4c43.6,43.6,76.9,14.9,104.2-12.4C981,928.3,1011.8,893,968.2,849.4z M524.5,522c-88.9,88.7-233,88.7-321.8,0c-88.9-88.7-88.9-232.6,0-321.3c88.9-88.7,233-88.7,321.8,0C613.4,289.4,613.4,433.3,524.5,522z" />
  </svg>
)).attrs({
  className: 'search-icon',
})`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  height: 2em;
  width: 1em;

  path {
    fill: ${props => props.theme.sidebar.textColor};
  }
`;
export const CopyIcon = styled((props: { className?: string }) => (
  <svg
    className={props.className}
    version="1.1"
    viewBox="0 0 350 350"
    x="0px"
    xmlns="http://www.w3.org/2000/svg"
    y="0px"
  >
    <path
      d="M318.54,57.282h-47.652V15c0-8.284-6.716-15-15-15H34.264c-8.284,0-15,6.716-15,15v265.522c0,8.284,6.716,15,15,15h47.651
		v42.281c0,8.284,6.716,15,15,15H318.54c8.284,0,15-6.716,15-15V72.282C333.54,63.998,326.824,57.282,318.54,57.282z
		 M49.264,265.522V30h191.623v27.282H96.916c-8.284,0-15,6.716-15,15v193.24H49.264z M303.54,322.804H111.916V87.282H303.54V322.804
		z"
    />
  </svg>
)).attrs({
  className: 'copy-icon',
})`
  height: 1.2em;
  width: 1.2em;
  z-index: 9;
  path {
    fill: ${props => props.theme.sidebar.textColor};
  }
`;

export const SearchResultsBox = styled.div`
  padding: ${props => props.theme.spacing.unit}px 0;
  background-color: ${({ theme }) => darken(0.05, theme.sidebar.backgroundColor)}};
  color: ${props => props.theme.sidebar.textColor};
  min-height: 150px;
  max-height: 250px;
  border-top: ${({ theme }) => darken(0.1, theme.sidebar.backgroundColor)}};
  border-bottom: ${({ theme }) => darken(0.1, theme.sidebar.backgroundColor)}};
  margin-top: 10px;
  line-height: 1.4;
  font-size: 0.9em;
  
  li {
    background-color: inherit;
  }

  ${MenuItemLabel} {
    padding-top: 6px;
    padding-bottom: 6px;

    &:hover,
    &.active {
      background-color: ${({ theme }) => darken(0.1, theme.sidebar.backgroundColor)};
    }

    > svg {
      display: none;
    }
  }
`;

export const ClearIcon = styled.i`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  width: ${props => props.theme.spacing.unit * 2}px;
  text-align: center;
  line-height: 2em;
  vertical-align: middle;
  cursor: pointer;
  font-style: normal;
  color: '#666';

  &:hover {
    color: #8d8d8dff;
  }
`;
