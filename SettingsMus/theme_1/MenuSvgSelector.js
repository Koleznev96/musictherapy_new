import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const MenuSvgSelector = ({id}) => {
  switch (id) {
    case 'programs':
      return (
        <Svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M10.7236 0.751466C10.2549 0.282837 9.49513 0.282837 9.0265 0.751466L0.626496 9.15147C0.157867 9.6201 0.157867 10.3799 0.626496 10.8485C1.09513 11.3172 1.85492 11.3172 2.32355 10.8485L2.67502 10.4971V18.4C2.67502 19.0627 3.21228 19.6 3.87502 19.6H6.27502C6.93777 19.6 7.47502 19.0627 7.47502 18.4V16C7.47502 15.3373 8.01228 14.8 8.67502 14.8H11.075C11.7378 14.8 12.275 15.3373 12.275 16V18.4C12.275 19.0627 12.8123 19.6 13.475 19.6H15.875C16.5378 19.6 17.075 19.0627 17.075 18.4V10.4971L17.4265 10.8485C17.8951 11.3172 18.6549 11.3172 19.1236 10.8485C19.5922 10.3799 19.5922 9.6201 19.1236 9.15147L10.7236 0.751466Z"
            fill="#D4DDE0"
            fillOpacity="0.6"
          />
        </Svg>
      );
    case 'programs_active':
      return (
        <Svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M10.7235 0.751466C10.2549 0.282837 9.4951 0.282837 9.02647 0.751466L0.626466 9.15147C0.157837 9.6201 0.157837 10.3799 0.626466 10.8485C1.09509 11.3172 1.85489 11.3172 2.32352 10.8485L2.67499 10.4971V18.4C2.67499 19.0627 3.21225 19.6 3.87499 19.6H6.27499C6.93774 19.6 7.47499 19.0627 7.47499 18.4V16C7.47499 15.3373 8.01225 14.8 8.67499 14.8H11.075C11.7377 14.8 12.275 15.3373 12.275 16V18.4C12.275 19.0627 12.8123 19.6 13.475 19.6H15.875C16.5377 19.6 17.075 19.0627 17.075 18.4V10.4971L17.4265 10.8485C17.8951 11.3172 18.6549 11.3172 19.1235 10.8485C19.5922 10.3799 19.5922 9.6201 19.1235 9.15147L10.7235 0.751466Z"
            fill="#FBFCFC"
          />
        </Svg>
      );
    case 'goal':
      return (
        <Svg
          width="18"
          height="21"
          viewBox="0 0 18 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.68528 2.8603C5.96568 -0.420107 11.2843 -0.420107 14.5647 2.8603C17.8451 6.1407 17.8451 11.4593 14.5647 14.7397L8.62498 20.6794L2.68528 14.7397C-0.595125 11.4593 -0.595125 6.1407 2.68528 2.8603ZM8.62498 11.2C9.95046 11.2 11.025 10.1255 11.025 8.79999C11.025 7.47451 9.95046 6.39999 8.62498 6.39999C7.29949 6.39999 6.22498 7.47451 6.22498 8.79999C6.22498 10.1255 7.29949 11.2 8.62498 11.2Z"
            fill="#D4DDE0"
            fillOpacity="0.6"
          />
        </Svg>
      );
    case 'goal_active':
      return (
        <Svg
          width="18"
          height="21"
          viewBox="0 0 18 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.68528 2.86033C5.96568 -0.420076 11.2843 -0.420077 14.5647 2.86033C17.8451 6.14073 17.8451 11.4593 14.5647 14.7397L8.62498 20.6794L2.68528 14.7397C-0.595125 11.4593 -0.595125 6.14073 2.68528 2.86033ZM8.62498 11.2C9.95046 11.2 11.025 10.1255 11.025 8.80002C11.025 7.47454 9.95046 6.40002 8.62498 6.40002C7.29949 6.40002 6.22498 7.47454 6.22498 8.80002C6.22498 10.1255 7.29949 11.2 8.62498 11.2Z"
            fill="#FBFCFC"
          />
        </Svg>
      );
    case 'consultant':
      return (
        <Svg
          width="18"
          height="22"
          viewBox="0 0 18 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.9357 0.255522C11.4353 0.412986 11.775 0.876243 11.775 1.40001V7.40001L16.575 7.40001C17.0224 7.40001 17.4327 7.64896 17.6394 8.04584C17.846 8.44271 17.8147 8.9216 17.5581 9.28816L9.15806 21.2882C8.8577 21.7172 8.31375 21.902 7.81421 21.7445C7.31468 21.587 6.97498 21.1238 6.97498 20.6L6.97498 14.6H2.17498C1.72753 14.6 1.31724 14.3511 1.1106 13.9542C0.903967 13.5573 0.935305 13.0784 1.1919 12.7119L9.5919 0.711853C9.89226 0.282768 10.4362 0.098058 10.9357 0.255522Z"
            fill="#D4DDE0"
            fillOpacity="0.6"
          />
        </Svg>
      );
    case 'consultant_active':
      return (
        <Svg
          width="18"
          height="22"
          viewBox="0 0 18 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.9357 0.255522C11.4353 0.412986 11.775 0.876243 11.775 1.40001V7.40001L16.575 7.40001C17.0224 7.40001 17.4327 7.64896 17.6394 8.04584C17.846 8.44271 17.8147 8.9216 17.5581 9.28816L9.15806 21.2882C8.8577 21.7172 8.31375 21.902 7.81421 21.7445C7.31468 21.587 6.97498 21.1238 6.97498 20.6L6.97498 14.6H2.17498C1.72753 14.6 1.31724 14.3511 1.1106 13.9542C0.903967 13.5573 0.935305 13.0784 1.1919 12.7119L9.5919 0.711853C9.89226 0.282768 10.4362 0.098058 10.9357 0.255522Z"
            fill="#FBFCFC"
          />
        </Svg>
      );
    case 'profile':
      return (
        <Svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.725 9.99999C19.725 15.3019 15.427 19.6 10.125 19.6C4.82309 19.6 0.525024 15.3019 0.525024 9.99999C0.525024 4.69806 4.82309 0.399994 10.125 0.399994C15.427 0.399994 19.725 4.69806 19.725 9.99999ZM12.525 6.39999C12.525 7.72548 11.4505 8.79999 10.125 8.79999C8.79954 8.79999 7.72502 7.72548 7.72502 6.39999C7.72502 5.07451 8.79954 3.99999 10.125 3.99999C11.4505 3.99999 12.525 5.07451 12.525 6.39999ZM10.1249 11.2C7.70389 11.2 5.61776 12.6339 4.66951 14.6989C5.98986 16.2304 7.94421 17.2 10.125 17.2C12.3058 17.2 14.2601 16.2305 15.5804 14.699C14.6322 12.634 12.546 11.2 10.1249 11.2Z"
            fill="#D4DDE0"
            fillOpacity="0.6"
          />
        </Svg>
      );
    case 'profile_active':
      return (
        <Svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.725 9.99999C19.725 15.3019 15.427 19.6 10.125 19.6C4.82309 19.6 0.525024 15.3019 0.525024 9.99999C0.525024 4.69806 4.82309 0.399994 10.125 0.399994C15.427 0.399994 19.725 4.69806 19.725 9.99999ZM12.525 6.39999C12.525 7.72548 11.4505 8.79999 10.125 8.79999C8.79954 8.79999 7.72502 7.72548 7.72502 6.39999C7.72502 5.07451 8.79954 3.99999 10.125 3.99999C11.4505 3.99999 12.525 5.07451 12.525 6.39999ZM10.1249 11.2C7.70389 11.2 5.61776 12.6339 4.66951 14.6989C5.98986 16.2304 7.94421 17.2 10.125 17.2C12.3058 17.2 14.2601 16.2305 15.5804 14.699C14.6322 12.634 12.546 11.2 10.1249 11.2Z"
            fill="#FBFCFC"
          />
        </Svg>
      );
    case 'playlists':
      return (
        <Svg
          width="21"
          height="14"
          viewBox="0 0 21 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M1 10H11C11.2652 10 11.5196 9.89464 11.7071 9.70711C11.8946 9.51957 12 9.26522 12 9C12 8.73478 11.8946 8.48043 11.7071 8.29289C11.5196 8.10536 11.2652 8 11 8H1C0.734784 8 0.48043 8.10536 0.292893 8.29289C0.105357 8.48043 0 8.73478 0 9C0 9.26522 0.105357 9.51957 0.292893 9.70711C0.48043 9.89464 0.734784 10 1 10ZM1 6H11C11.2652 6 11.5196 5.89464 11.7071 5.70711C11.8946 5.51957 12 5.26522 12 5C12 4.73478 11.8946 4.48043 11.7071 4.29289C11.5196 4.10536 11.2652 4 11 4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6ZM1 2H19C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2ZM19 12H1C0.734784 12 0.48043 12.1054 0.292893 12.2929C0.105357 12.4804 0 12.7348 0 13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H19C19.2652 14 19.5196 13.8946 19.7071 13.7071C19.8946 13.5196 20 13.2652 20 13C20 12.7348 19.8946 12.4804 19.7071 12.2929C19.5196 12.1054 19.2652 12 19 12ZM17.64 4.57C17.5412 4.47449 17.4239 4.40036 17.2952 4.35223C17.1665 4.30409 17.0293 4.28299 16.8921 4.29023C16.7549 4.29747 16.6207 4.3329 16.4978 4.39432C16.3749 4.45573 16.266 4.54181 16.1778 4.64718C16.0897 4.75255 16.0242 4.87495 15.9854 5.00676C15.9467 5.13856 15.9355 5.27694 15.9526 5.41325C15.9697 5.54957 16.0147 5.6809 16.0848 5.79905C16.1549 5.91721 16.2486 6.01966 16.36 6.1L17.44 7L16.36 7.9C16.2587 7.98395 16.175 8.08705 16.1137 8.2034C16.0523 8.31974 16.0145 8.44705 16.0025 8.57803C15.9904 8.70901 16.0043 8.84108 16.0433 8.96668C16.0824 9.09229 16.1458 9.20895 16.23 9.31C16.324 9.42288 16.4418 9.51366 16.5748 9.57588C16.7079 9.6381 16.8531 9.67024 17 9.67C17.2349 9.66766 17.4615 9.58269 17.64 9.43L19.64 7.77C19.7532 7.67617 19.8444 7.55851 19.907 7.42542C19.9695 7.29232 20.002 7.14707 20.002 7C20.002 6.85293 19.9695 6.70768 19.907 6.57458C19.8444 6.44149 19.7532 6.32383 19.64 6.23L17.64 4.57Z"
            fill="#D4DDE0"
            fillOpacity="0.6"
          />
        </Svg>
      );
    case 'playlists_active':
      return (
        <Svg
          width="21"
          height="14"
          viewBox="0 0 21 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M1 10H11C11.2652 10 11.5196 9.89464 11.7071 9.70711C11.8946 9.51957 12 9.26522 12 9C12 8.73478 11.8946 8.48043 11.7071 8.29289C11.5196 8.10536 11.2652 8 11 8H1C0.734784 8 0.48043 8.10536 0.292893 8.29289C0.105357 8.48043 0 8.73478 0 9C0 9.26522 0.105357 9.51957 0.292893 9.70711C0.48043 9.89464 0.734784 10 1 10ZM1 6H11C11.2652 6 11.5196 5.89464 11.7071 5.70711C11.8946 5.51957 12 5.26522 12 5C12 4.73478 11.8946 4.48043 11.7071 4.29289C11.5196 4.10536 11.2652 4 11 4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6ZM1 2H19C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2ZM19 12H1C0.734784 12 0.48043 12.1054 0.292893 12.2929C0.105357 12.4804 0 12.7348 0 13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H19C19.2652 14 19.5196 13.8946 19.7071 13.7071C19.8946 13.5196 20 13.2652 20 13C20 12.7348 19.8946 12.4804 19.7071 12.2929C19.5196 12.1054 19.2652 12 19 12ZM17.64 4.57C17.5412 4.47449 17.4239 4.40036 17.2952 4.35223C17.1665 4.30409 17.0293 4.28299 16.8921 4.29023C16.7549 4.29747 16.6207 4.3329 16.4978 4.39432C16.3749 4.45573 16.266 4.54181 16.1778 4.64718C16.0897 4.75255 16.0242 4.87495 15.9854 5.00676C15.9467 5.13856 15.9355 5.27694 15.9526 5.41325C15.9697 5.54957 16.0147 5.6809 16.0848 5.79905C16.1549 5.91721 16.2486 6.01966 16.36 6.1L17.44 7L16.36 7.9C16.2587 7.98395 16.175 8.08705 16.1137 8.2034C16.0523 8.31974 16.0145 8.44705 16.0025 8.57803C15.9904 8.70901 16.0043 8.84108 16.0433 8.96668C16.0824 9.09229 16.1458 9.20895 16.23 9.31C16.324 9.42288 16.4418 9.51366 16.5748 9.57588C16.7079 9.6381 16.8531 9.67024 17 9.67C17.2349 9.66766 17.4615 9.58269 17.64 9.43L19.64 7.77C19.7532 7.67617 19.8444 7.55851 19.907 7.42542C19.9695 7.29232 20.002 7.14707 20.002 7C20.002 6.85293 19.9695 6.70768 19.907 6.57458C19.8444 6.44149 19.7532 6.32383 19.64 6.23L17.64 4.57Z"
            fill="#FBFCFC"
          />
        </Svg>
      );

    default:
      return null;
  }
};
