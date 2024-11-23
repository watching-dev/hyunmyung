import { ImageActions } from "@xeger/quill-image-actions";
import React from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";

type Props = ReactQuillProps & {
  reactQuillRef: React.Ref<ReactQuill>;
  // reactQuillRef?: React.Ref<ReactQuill>;
};

// interface ForwardedQuillComponent extends ReactQuillProps {
//   forwardedRef: React.Ref<ReactQuill>;
// }

const ReactQuillWrapper = (props: Props) => {
  const { reactQuillRef, ...args } = props;

  // build하면 계속 document is not defined 뜬게 결국 다이나믹인 여기서 register한게 아니라 posting 안에서 register 해서 안된거였네 / dev에서는 그렇게 안하면 안됐으니까
  // 그리고 module 어쩌고 하면서 에러 뜰때도 있는데 모듈에 imageActions: {}, 이거 추가 안돼서 그런거
  // ...args -> ...변수? 이거 안하면 나머지 프로퍼티가 적용 안되네_사용은 가능_props로 값을 던지지만 받을 수 없어서 그런지 적용이 하나도 안됨
  ReactQuill.Quill.register("modules/imageActions", ImageActions);
  return <ReactQuill ref={reactQuillRef} {...args} />;
};
export default ReactQuillWrapper;

// export default function ReactQuillEditor({
//   forwardedRef,
//   ...props
// }: ForwardedQuillComponent) {
//   const editorRef = useRef<ReactQuill>(null);
//   const quill = ReactQuill.Quill;

//   quill.register("modules/imageActions", ImageActions);
//   return <ReactQuill ref={reactQuillRef} />;
// return <ReactQuill theme="snow" ref={forwardedRef} {...props} />;
// }
