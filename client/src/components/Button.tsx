import React from 'react';

type Props = {
    classname: string,
    text: string,
    id: string
}

const Button = ({classname, text, id}: Props) => {
  return (
    <button className={classname} id={id}>{text}</button>
  );
};

export default Button;