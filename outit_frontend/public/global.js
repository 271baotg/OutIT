import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    body {
      margin: 0; line-height: normal;
    }
:root {

/* fonts */
--link: Outfit;
--paragraph-paragraph-3: 'DM Sans';

/* font sizes */
--link-size: 15px;
--link-small-size: 14px;
--font-size-5xl: 24px;
--paragraph-paragraph-2-size: 16px;
--headline-headline-3-size: 22px;
--display-display-3-size: 48px;
--headline-headline-4-size: 18px;
--headline-headline-2-size: 36px;
--display-display-2-size: 64px;
--display-display-1-size: 72px;

/* Colors */
--text-text-white: #fff;
--text-text: #7b88a8;
--text-text-gray: #e7e5ea;
--action-blue: #4f77ff;
--text-heading: #2d3958;
--bg-bg-gray: #292f3a;
--action-purple: #886cff;
--bg-bg-light: #f8fafc;
--text-color-black: #000;
--primary-color-black: #120f1f;
--bg-bg-dark: #12022f;
--black-200: #788190;
--lines-hr-line: rgba(97, 119, 152, 0.2);

/* Gaps */
--gap-11xl: 30px;

/* Paddings */
--padding-smi: 13px;
--padding-5xl: 24px;
--padding-lg: 18px;
--padding-13xl: 32px;

/* Border radiuses */
--br-8xs: 5px;
--br-xl: 20px;

/* Effects */
--blue-shadow: 0px 20px 50px rgba(79, 119, 255, 0.2);
--main-shadow: 0px 5px 20px rgba(18, 2, 47, 0.15);
}
`;
