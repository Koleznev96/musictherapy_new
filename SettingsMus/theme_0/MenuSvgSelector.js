import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const MenuSvgSelector = ({id}) => {
  switch (id) {
    case 'programs':
      return (
        <Svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M1 2H19C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2ZM19 10H1C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11C0 11.2652 0.105357 11.5196 0.292893 11.7071C0.48043 11.8946 0.734784 12 1 12H19C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10ZM19 5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7H19C19.2652 7 19.5196 6.89464 19.7071 6.70711C19.8946 6.51957 20 6.26522 20 6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5Z"
            fill="#B3B3B3"
          />
        </Svg>
      );
    case 'programs_active':
      return (
        <Svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M1 2H19C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2ZM19 10H1C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11C0 11.2652 0.105357 11.5196 0.292893 11.7071C0.48043 11.8946 0.734784 12 1 12H19C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10ZM19 5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7H19C19.2652 7 19.5196 6.89464 19.7071 6.70711C19.8946 6.51957 20 6.26522 20 6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5Z"
            fill="#7092BE"
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
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V13C0 13.7956 0.316071 14.5587 0.87868 15.1213C1.44129 15.6839 2.20435 16 3 16H17C17.7956 16 18.5587 15.6839 19.1213 15.1213C19.6839 14.5587 20 13.7956 20 13V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0ZM3 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3L10 7.88L2 3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2ZM18 13C18 13.2652 17.8946 13.5196 17.7071 13.7071C17.5196 13.8946 17.2652 14 17 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V5.28L9.48 9.85C9.63202 9.93777 9.80446 9.98397 9.98 9.98397C10.1555 9.98397 10.328 9.93777 10.48 9.85L18 5.28V13Z"
            fill="#B3B3B3"
          />
        </Svg>
      );
    case 'consultant_active':
      return (
        <Svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V13C0 13.7956 0.316071 14.5587 0.87868 15.1213C1.44129 15.6839 2.20435 16 3 16H17C17.7956 16 18.5587 15.6839 19.1213 15.1213C19.6839 14.5587 20 13.7956 20 13V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0ZM3 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3L10 7.88L2 3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2ZM18 13C18 13.2652 17.8946 13.5196 17.7071 13.7071C17.5196 13.8946 17.2652 14 17 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V5.28L9.48 9.85C9.63202 9.93777 9.80446 9.98397 9.98 9.98397C10.1555 9.98397 10.328 9.93777 10.48 9.85L18 5.28V13Z"
            fill="#7092BE"
          />
        </Svg>
      );
    case 'profile':
      return (
        <Svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M13.646 11.71C14.6264 10.9387 15.342 9.88092 15.6933 8.68394C16.0445 7.48697 16.014 6.21027 15.6058 5.03147C15.1977 3.85267 14.4323 2.83039 13.4161 2.10686C12.3999 1.38332 11.1835 0.994507 9.93603 0.994507C8.68858 0.994507 7.47215 1.38332 6.45596 2.10686C5.43978 2.83039 4.67438 3.85267 4.26624 5.03147C3.85811 6.21027 3.82754 7.48697 4.17879 8.68394C4.53004 9.88092 5.24564 10.9387 6.22603 11.71C4.54611 12.383 3.08032 13.4994 1.98492 14.9399C0.88953 16.3805 0.205595 18.0913 0.00603184 19.89C-0.00841357 20.0213 0.00314838 20.1542 0.0400573 20.2811C0.0769662 20.4079 0.138499 20.5263 0.221143 20.6293C0.388051 20.8375 0.630815 20.9708 0.896032 21C1.16125 21.0292 1.42719 20.9518 1.63536 20.7849C1.84352 20.618 1.97686 20.3752 2.00603 20.11C2.22562 18.1552 3.15772 16.3498 4.62425 15.0388C6.09078 13.7278 7.98893 13.003 9.95603 13.003C11.9231 13.003 13.8213 13.7278 15.2878 15.0388C16.7543 16.3498 17.6864 18.1552 17.906 20.11C17.9332 20.3557 18.0505 20.5827 18.2351 20.747C18.4198 20.9114 18.6588 21.0015 18.906 21H19.016C19.2782 20.9698 19.5178 20.8373 19.6826 20.6313C19.8474 20.4252 19.9241 20.1624 19.896 19.9C19.6955 18.0962 19.0079 16.381 17.9069 14.9382C16.8059 13.4954 15.3329 12.3795 13.646 11.71ZM9.93603 11C9.14491 11 8.37155 10.7654 7.71375 10.3259C7.05595 9.88636 6.54326 9.26164 6.24051 8.53074C5.93776 7.79983 5.85855 6.99557 6.01289 6.21964C6.16723 5.44372 6.54819 4.73099 7.1076 4.17158C7.66701 3.61217 8.37975 3.2312 9.15567 3.07686C9.9316 2.92252 10.7359 3.00173 11.4668 3.30448C12.1977 3.60724 12.8224 4.11993 13.2619 4.77772C13.7014 5.43552 13.936 6.20888 13.936 7C13.936 8.06087 13.5146 9.07828 12.7645 9.82843C12.0143 10.5786 10.9969 11 9.93603 11Z"
            fill="#B3B3B3"
          />
        </Svg>
      );
    case 'profile_active':
      return (
        <Svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M14.5821 10.7155C15.5625 9.94416 16.2781 8.88642 16.6293 7.68944C16.9806 6.49246 16.95 5.21576 16.5419 4.03696C16.1337 2.85817 15.3683 1.83589 14.3521 1.11235C13.336 0.388815 12.1195 0 10.8721 0C9.62462 0 8.40818 0.388815 7.392 1.11235C6.37581 1.83589 5.61041 2.85817 5.20228 4.03696C4.79415 5.21576 4.76358 6.49246 5.11483 7.68944C5.46608 8.88642 6.18167 9.94416 7.16207 10.7155C5.48214 11.3885 4.01635 12.5048 2.92096 13.9454C1.82556 15.386 1.14163 17.0968 0.942067 18.8955C0.927622 19.0268 0.939184 19.1597 0.976092 19.2866C1.013 19.4134 1.07453 19.5317 1.15718 19.6348C1.32409 19.843 1.56685 19.9763 1.83207 20.0055C2.09728 20.0347 2.36323 19.9573 2.57139 19.7904C2.77956 19.6235 2.91289 19.3807 2.94207 19.1155C3.16165 17.1607 4.09375 15.3553 5.56029 14.0443C7.02682 12.7333 8.92497 12.0085 10.8921 12.0085C12.8592 12.0085 14.7573 12.7333 16.2238 14.0443C17.6904 15.3553 18.6225 17.1607 18.8421 19.1155C18.8693 19.3612 18.9865 19.5882 19.1712 19.7525C19.3558 19.9169 19.5949 20.007 19.8421 20.0055H19.9521C20.2142 19.9753 20.4538 19.8428 20.6186 19.6367C20.7835 19.4307 20.8602 19.1679 20.8321 18.9055C20.6316 17.1017 19.9439 15.3865 18.8429 13.9437C17.7419 12.5009 16.269 11.385 14.5821 10.7155ZM10.8721 10.0055C10.0809 10.0055 9.30758 9.7709 8.64979 9.33137C7.99199 8.89185 7.4793 8.26713 7.17655 7.53623C6.8738 6.80533 6.79458 6.00106 6.94893 5.22513C7.10327 4.44921 7.48423 3.73648 8.04364 3.17707C8.60305 2.61766 9.31578 2.2367 10.0917 2.08235C10.8676 1.92801 11.6719 2.00723 12.4028 2.30998C13.1337 2.61273 13.7584 3.12542 14.1979 3.78321C14.6375 4.44101 14.8721 5.21437 14.8721 6.0055C14.8721 7.06636 14.4506 8.08378 13.7005 8.83392C12.9503 9.58407 11.9329 10.0055 10.8721 10.0055Z"
            fill="#7092BE"
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
            fill="#B3B3B3"
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
            fill="#7092BE"
          />
        </Svg>
      );

    default:
      return null;
  }
};
