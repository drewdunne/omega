import React from 'react';

type Props = {
    classname: string,
    text: string,
    id: string,
    handleClick?: () => void
}

const Button = ({classname, text, id, handleClick}: Props) => {
  return (
    <div className={classname} id={id} onClick={handleClick}>{text}</div>
  );
};

export default Button;