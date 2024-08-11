import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag, theme, Flex, Tooltip } from 'antd';

const tagsTemplate = {
  address: 'Адрес: ',
  min_price: 'Минимальная цена: ',
  max_price: 'Максимальная цена: ',
}

function TagsLine({ filterAds, updateFilterAds }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const elements = []
    for (var key in filterAds) {
      elements.push(key)
    }
    setTags(elements)
  }, [])

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  return (
    <Flex gap="4px 0" wrap>
      {tags.map((tag, index) => {return (
          <Tag
            key={tag}
            closable={index > -1}
            style={{ userSelect: 'none', 'font-size': '15px', 'font-weight': '600' }}
            onClose={() => handleClose(tag)}>
            <span>{tagsTemplate[tag]}{filterAds[tag]}</span>
          </Tag>
      )})}
    </Flex>
  );
}

export default TagsLine;