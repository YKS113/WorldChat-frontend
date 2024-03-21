import React, { useState } from 'react';
import styled from 'styled-components';
import { useChatContext } from '../../context/ChatContext';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { IoEllipse } from 'react-icons/io5';
import ReactCountryFlag from "react-country-flag"

function TargetLanguageList() {
  const [display, setDisplay] = useState(false);
  const { targetLanguage,setTargetLanguage } = useChatContext();
  const handleToggleDisplay = () => {
    setDisplay(!display);
  };

//   const [targetLanguage,setTargetLanguage] = useState({lang: 'en-us',countryCode:"us"});

  const handlelanguageChange=(el)=>{
    setTargetLanguage(el)
    console.log(targetLanguage);
    handleToggleDisplay()
    }

  const languages=[
    {lang: 'bg',countryCode:"bg"},
    {lang: 'cs',countryCode:"cz"},
    {lang: 'da',countryCode:"dk"},
    {lang: 'de',countryCode:"de"},
    {lang: 'el',countryCode:"gr"},
    {lang: 'en-us',countryCode:"us"},
    {lang: 'en-gb',countryCode:"gb"},
    {lang: 'es',countryCode:"es"},
    {lang: 'et',countryCode:"ee"},
    {lang: 'fi',countryCode:"fi"},
    {lang: 'fr',countryCode:"fr"},
    {lang: 'hu',countryCode:"hu"},
    {lang: 'id',countryCode:"id"},
    {lang: 'it',countryCode:"it"},
    {lang: 'ja',countryCode:"jp"},
    {lang: 'ko',countryCode:"kr"},
    {lang: 'lt',countryCode:"lt"},
    {lang: 'lv',countryCode:"lv"},
    {lang: 'nb',countryCode:"no"},
    {lang: 'nl',countryCode:"nl"},
    {lang: 'pl',countryCode:"pl"},
    {lang: 'pt',countryCode:"pt"},
    {lang: 'ro',countryCode:"ro"},
    {lang: 'ru',countryCode:"ru"},
    {lang: 'sk',countryCode:"sk"},
    {lang: 'sl',countryCode:"sl"},
    {lang: 'sv',countryCode:"se"},
    {lang: 'tr',countryCode:"tr"},
    {lang: 'uk',countryCode:"ua"},
    {lang: 'zh',countryCode:"cn"}
  ];
  

  return <List>
    <ListGroup >
        <GroupTitle onClick={() => handleToggleDisplay()}>
        <span className='txt'>Autotanslate to</span> <span className='flagEmoji'><ReactCountryFlag countryCode={targetLanguage.countryCode}/></span>
          {display ? <BiChevronDown /> : <BiChevronUp />}
        </GroupTitle>
        {display ?
        <LangBox>
        {languages.map((el,index)=>{
            return (
              <span className='flag' onClick={()=>handlelanguageChange(el)}>
              <ReactCountryFlag countryCode={el.countryCode} />
              </span>
            )
          })}
        </LangBox> 
          :<></>}
      </ListGroup>
  </List>;
}

const List = styled.div`
  width: 100%;
  max-width: 480px;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    background-color: var(--bg-color-main);
    width: 6px;
    &-thumb {
      background-color: var(--bg-color-darken);
      border-radius: 8px;
    }
  }
`;

const ListGroup = styled.ul`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GroupTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  color: var(--main-color);
  align-self: flex-start;
  margin-bottom: 4px;
  text-transform: capitalize;
  cursor: pointer;
  position: relative;
  span{
  font-size: 1.25rem;
  text-align: center;
  filter: saturate(90%);
  }
  .txt{
  font-size: 1rem;
  font-weight: 500;
  color: var(--main-color);
  align-self: flex-start;
  margin-bottom: 4px;
  text-transform: capitalize;
  @media screen and (max-width: 768px) {
    display: none;
  }
  }
  .flagEmoji{
  font-family: "Twemoji Country Flags", "Helvetica", "Comic Sans", serif;
  }
  
`;

const LangBox=styled.section`
    color: var(--main-color);
    background-color: var(--ghost-white);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
    position: absolute;
    top: 60px;
    padding: 1rem;
    border-radius: 2rem;
    z-index: 10;
    font-family: "Twemoji Country Flags", "Helvetica", "Comic Sans", serif;
    .flag{
        display: inline-block;
        font-size: 1em;
        line-height: 1em;
        cursor: pointer;
    }
`;

export default TargetLanguageList;
