type Props = {
  relation: "user" | "received-request" | "sent-request" | "friend" | "none";
  trigger: () => void;
};

const RequestButton = ({ trigger, relation }: Props) => {
  return <button onClick={trigger}>Click</button>;
};

export default RequestButton;
