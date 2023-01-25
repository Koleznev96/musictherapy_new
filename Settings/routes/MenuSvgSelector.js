import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const MenuSvgSelector = ({id}) => {
  switch (id) {
    case 'programs':
      return (
        <Svg
          width="15"
          height="12"
          viewBox="0 0 15 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M1 11H14.125M1 6H14.125M1 1H14.125"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'programs_active':
      return (
        <Svg
          width="15"
          height="12"
          viewBox="0 0 15 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M1 11H14.125M1 6H14.125M1 1H14.125"
            stroke="#C38310"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'goal':
      return (
        <Svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M10 9C9.80222 9 9.60888 9.05865 9.44443 9.16853C9.27999 9.27841 9.15181 9.43459 9.07613 9.61732C9.00044 9.80004 8.98063 10.0011 9.01922 10.1951C9.0578 10.3891 9.15305 10.5673 9.2929 10.7071C9.43275 10.847 9.61093 10.9422 9.80491 10.9808C9.9989 11.0194 10.2 10.9996 10.3827 10.9239C10.5654 10.8482 10.7216 10.72 10.8315 10.5556C10.9414 10.3911 11 10.1978 11 10C11 9.73478 10.8946 9.48043 10.7071 9.29289C10.5196 9.10536 10.2652 9 10 9ZM10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V0ZM11 17.93V15C11 14.7348 10.8946 14.4804 10.7071 14.2929C10.5196 14.1054 10.2652 14 10 14C9.73479 14 9.48043 14.1054 9.2929 14.2929C9.10536 14.4804 9 14.7348 9 15V17.93C7.23998 17.7068 5.60408 16.9049 4.34959 15.6504C3.0951 14.3959 2.2932 12.76 2.07 11H5C5.26522 11 5.51957 10.8946 5.70711 10.7071C5.89465 10.5196 6 10.2652 6 10C6 9.73478 5.89465 9.48043 5.70711 9.29289C5.51957 9.10536 5.26522 9 5 9H2.07C2.2932 7.23998 3.0951 5.60408 4.34959 4.34959C5.60408 3.0951 7.23998 2.29319 9 2.07V5C9 5.26522 9.10536 5.51957 9.2929 5.70711C9.48043 5.89464 9.73479 6 10 6C10.2652 6 10.5196 5.89464 10.7071 5.70711C10.8946 5.51957 11 5.26522 11 5V2.07C12.76 2.29319 14.3959 3.0951 15.6504 4.34959C16.9049 5.60408 17.7068 7.23998 17.93 9H15C14.7348 9 14.4804 9.10536 14.2929 9.29289C14.1054 9.48043 14 9.73478 14 10C14 10.2652 14.1054 10.5196 14.2929 10.7071C14.4804 10.8946 14.7348 11 15 11H17.93C17.7068 12.76 16.9049 14.3959 15.6504 15.6504C14.3959 16.9049 12.76 17.7068 11 17.93Z"
            fill="#B3B3B3"
          />
        </Svg>
      );
    case 'goal_active':
      return (
        <Svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M10 9C9.80222 9 9.60888 9.05865 9.44443 9.16853C9.27999 9.27841 9.15181 9.43459 9.07613 9.61732C9.00044 9.80004 8.98063 10.0011 9.01922 10.1951C9.0578 10.3891 9.15305 10.5673 9.2929 10.7071C9.43275 10.847 9.61093 10.9422 9.80491 10.9808C9.9989 11.0194 10.2 10.9996 10.3827 10.9239C10.5654 10.8482 10.7216 10.72 10.8315 10.5556C10.9414 10.3911 11 10.1978 11 10C11 9.73478 10.8946 9.48043 10.7071 9.29289C10.5196 9.10536 10.2652 9 10 9ZM10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V0ZM11 17.93V15C11 14.7348 10.8946 14.4804 10.7071 14.2929C10.5196 14.1054 10.2652 14 10 14C9.73479 14 9.48043 14.1054 9.2929 14.2929C9.10536 14.4804 9 14.7348 9 15V17.93C7.23998 17.7068 5.60408 16.9049 4.34959 15.6504C3.0951 14.3959 2.2932 12.76 2.07 11H5C5.26522 11 5.51957 10.8946 5.70711 10.7071C5.89465 10.5196 6 10.2652 6 10C6 9.73478 5.89465 9.48043 5.70711 9.29289C5.51957 9.10536 5.26522 9 5 9H2.07C2.2932 7.23998 3.0951 5.60408 4.34959 4.34959C5.60408 3.0951 7.23998 2.29319 9 2.07V5C9 5.26522 9.10536 5.51957 9.2929 5.70711C9.48043 5.89464 9.73479 6 10 6C10.2652 6 10.5196 5.89464 10.7071 5.70711C10.8946 5.51957 11 5.26522 11 5V2.07C12.76 2.29319 14.3959 3.0951 15.6504 4.34959C16.9049 5.60408 17.7068 7.23998 17.93 9H15C14.7348 9 14.4804 9.10536 14.2929 9.29289C14.1054 9.48043 14 9.73478 14 10C14 10.2652 14.1054 10.5196 14.2929 10.7071C14.4804 10.8946 14.7348 11 15 11H17.93C17.7068 12.76 16.9049 14.3959 15.6504 15.6504C14.3959 16.9049 12.76 17.7068 11 17.93Z"
            fill="#7092BE"
          />
        </Svg>
      );
    case 'consultant':
      return (
        <Svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M8.8125 1L6 6L1 6.625L4.75 11L3.5 16.625L8.8125 14.125L14.125 16.625L12.875 11L16.625 6.625L11.625 6L8.8125 1Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'consultant_active':
      return (
        <Svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M9.5 1.1875L6.6875 6.1875L1.6875 6.8125L5.4375 11.1875L4.1875 16.8125L9.5 14.3125L14.8125 16.8125L13.5625 11.1875L17.3125 6.8125L12.3125 6.1875L9.5 1.1875Z"
            stroke="#C38310"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'profile':
      return (
        <Svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M15.0002 0H5.00016C4.55814 0 4.13421 0.175595 3.82165 0.488155C3.50909 0.800716 3.3335 1.22464 3.3335 1.66667V11.6667C3.3335 12.1087 3.50909 12.5326 3.82165 12.8452C4.13421 13.1577 4.55814 13.3333 5.00016 13.3333H15.0002C15.4422 13.3333 15.8661 13.1577 16.1787 12.8452C16.4912 12.5326 16.6668 12.1087 16.6668 11.6667V1.66667C16.6668 1.22464 16.4912 0.800716 16.1787 0.488155C15.8661 0.175595 15.4422 0 15.0002 0ZM10.0002 2.08333C10.5527 2.08333 11.0826 2.30283 11.4733 2.69353C11.864 3.08423 12.0835 3.61413 12.0835 4.16667C12.0835 4.7192 11.864 5.2491 11.4733 5.63981C11.0826 6.03051 10.5527 6.25 10.0002 6.25C9.44763 6.25 8.91772 6.03051 8.52702 5.63981C8.13632 5.2491 7.91683 4.7192 7.91683 4.16667C7.91683 3.61413 8.13632 3.08423 8.52702 2.69353C8.91772 2.30283 9.44763 2.08333 10.0002 2.08333V2.08333ZM14.1668 10.8333H5.8335V10.625C5.8335 9.08417 7.71183 7.5 10.0002 7.5C12.2885 7.5 14.1668 9.08417 14.1668 10.625V10.8333Z"
            fill="black"
          />
          <Path
            d="M1.66667 5H0V15C0 15.9192 0.7475 16.6667 1.66667 16.6667H11.6667V15H1.66667V5Z"
            fill="black"
          />
        </Svg>
      );
    case 'profile_active':
      return (
        <Svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M15.6667 0.666748H5.66667C5.22464 0.666748 4.80072 0.842343 4.48816 1.1549C4.17559 1.46746 4 1.89139 4 2.33341V12.3334C4 12.7754 4.17559 13.1994 4.48816 13.5119C4.80072 13.8245 5.22464 14.0001 5.66667 14.0001H15.6667C16.1087 14.0001 16.5326 13.8245 16.8452 13.5119C17.1577 13.1994 17.3333 12.7754 17.3333 12.3334V2.33341C17.3333 1.89139 17.1577 1.46746 16.8452 1.1549C16.5326 0.842343 16.1087 0.666748 15.6667 0.666748ZM10.6667 2.75008C11.2192 2.75008 11.7491 2.96957 12.1398 3.36028C12.5305 3.75098 12.75 4.28088 12.75 4.83341C12.75 5.38595 12.5305 5.91585 12.1398 6.30655C11.7491 6.69725 11.2192 6.91675 10.6667 6.91675C10.1141 6.91675 9.58423 6.69725 9.19353 6.30655C8.80283 5.91585 8.58333 5.38595 8.58333 4.83341C8.58333 4.28088 8.80283 3.75098 9.19353 3.36028C9.58423 2.96957 10.1141 2.75008 10.6667 2.75008V2.75008ZM14.8333 11.5001H6.5V11.2917C6.5 9.75091 8.37833 8.16675 10.6667 8.16675C12.955 8.16675 14.8333 9.75091 14.8333 11.2917V11.5001Z"
            fill="#C38310"
          />
          <Path
            d="M2.33317 5.66675H0.666504V15.6667C0.666504 16.5859 1.414 17.3334 2.33317 17.3334H12.3332V15.6667H2.33317V5.66675Z"
            fill="#C38310"
          />
        </Svg>
      );
    case 'playlists':
      return (
        <Svg
          width="19"
          height="16"
          viewBox="0 0 19 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M5 12.5C4.54167 12.5 4.14944 12.3369 3.82333 12.0108C3.49667 11.6842 3.33333 11.2917 3.33333 10.8333V1.66667C3.33333 1.20833 3.49667 0.815833 3.82333 0.489167C4.14944 0.163055 4.54167 0 5 0H9.16667L10.8333 1.66667H16.6667C17.125 1.66667 17.5175 1.83 17.8442 2.15667C18.1703 2.48278 18.3333 2.875 18.3333 3.33333V10.8333C18.3333 11.2917 18.1703 11.6842 17.8442 12.0108C17.5175 12.3369 17.125 12.5 16.6667 12.5H5ZM5 10.8333H16.6667V3.33333H10.1458L8.47917 1.66667H5V10.8333ZM15.8333 15.8333H1.66667C1.20833 15.8333 0.816111 15.6703 0.49 15.3442C0.163333 15.0175 0 14.625 0 14.1667V3.33333H1.66667V14.1667H15.8333V15.8333ZM6.66667 9.16667H15L12.1875 5.41667L10 8.33333L8.64583 6.52083L6.66667 9.16667ZM5 10.8333V1.66667V10.8333Z"
            fill="black"
          />
        </Svg>
      );
    case 'playlists_active':
      return (
        <Svg
          width="19"
          height="17"
          viewBox="0 0 19 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M5.33337 13.1667C4.87504 13.1667 4.48282 13.0036 4.15671 12.6775C3.83004 12.3509 3.66671 11.9584 3.66671 11.5V2.33335C3.66671 1.87502 3.83004 1.48252 4.15671 1.15585C4.48282 0.829742 4.87504 0.666687 5.33337 0.666687H9.50004L11.1667 2.33335H17C17.4584 2.33335 17.8509 2.49669 18.1775 2.82335C18.5037 3.14946 18.6667 3.54169 18.6667 4.00002V11.5C18.6667 11.9584 18.5037 12.3509 18.1775 12.6775C17.8509 13.0036 17.4584 13.1667 17 13.1667H5.33337ZM5.33337 11.5H17V4.00002H10.4792L8.81254 2.33335H5.33337V11.5ZM16.1667 16.5H2.00004C1.54171 16.5 1.14949 16.337 0.823374 16.0109C0.496707 15.6842 0.333374 15.2917 0.333374 14.8334V4.00002H2.00004V14.8334H16.1667V16.5ZM7.00004 9.83335H15.3334L12.5209 6.08335L10.3334 9.00002L8.97921 7.18752L7.00004 9.83335ZM5.33337 11.5V2.33335V11.5Z"
            fill="#C38310"
          />
        </Svg>
      );

    default:
      return null;
  }
};
