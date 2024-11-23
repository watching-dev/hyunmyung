"use client";

import dynamic from "next/dynamic";

// interface ForwardedQuillComponent extends ReactQuillProps {
//   forwardedRef: React.Ref<ReactQuill>;
// }

// dynamic import 적용
// const QuillNoSSRWrapper =
//   // typeof window === "object"
//   //   ?
//   dynamic(
//     async () => {
//       const { default: QuillComponent } = await import("react-quill");
//       const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
//         <QuillComponent ref={forwardedRef} {...props} />
//       );
//       return Quill;
//     },
//     {
//       loading: () => <div>...loading</div>,
//       ssr: false,
//     }
//   );
// // : () => false;

// export default QuillNoSSRWrapper;
// const ReactQuillDynamicWrapper = dynamic(() => import("./ReactQuillWrapper"), {
//   ssr: false,
// });

// // ReactQuillDynamicWrapper.displayName = 'ReactQuillDynamicWrapper';

// export default ReactQuillDynamicWrapper;

/* - - - - - - - - - - - */

// const DynamicQuillEditor = dynamic(async () => await import("./ReactQuillWrapper"), {
//   ssr: false,
// });
// 다이나믹은 비동기랑은 크게 상관 없는 듯?
const DynamicQuillEditor = dynamic(() => import("./ReactQuillWrapper"), {
  ssr: false,
  loading: () => <div>...loading</div>,
});

export default DynamicQuillEditor;
