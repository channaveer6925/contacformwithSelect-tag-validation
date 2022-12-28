import React, { useEffect, useState } from 'react';
import style from './Contact.module.css';
import Indiamap from '../../assets/Indiamap.svg';
import axios from 'axios';
import closeIcon from '../../assets/closeIcon.svg';

const ContactForm = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('General');

  const [selectedOption, setSelectedOption] = useState([]);

  // console.log('secondOption:', secondOption);
  console.log('selected:', selected);

  const [inputValue, setInputValue] = useState({
    exp1: '',
    exp2: '',
    yourName: '',
    jobTitle: '',
    organizationName: '',
    email: '',
    contactNumber: '',
    cityName: '',
    comment: '',
    aboutus: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == 'exp1') {
      setSelected(value);
    }
    if (name == 'exp2') {
      setSelectedOption([...selectedOption, value]);
    }
    setInputValue({ ...inputValue, [name]: value });
  };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('inputValue', inputValue);
    const formData = {
      ...inputValue,
      exp2: selectedOption,
    };
    console.log(formData);

    let payload = [];
    for (const key in inputValue) {
      let obj = {
        Attribute: key,
        Value: inputValue[key],
      };
      payload.push(obj);
    }
    axios
      .post(
        'https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture?accessKey=u$r60a0ef5b8ccbfefb7e5a6336bc3f1ff9&secretKey=3bf8f2b558a07b093dedf1d9e97bb800dc8640fc',
        payload
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // setFormData(payload);
    setInputValue({
      yourName: '',
      jobTitle: '',
      organizationName: '',
      email: '',
      contactNumber: '',
      cityName: '',
      comment: '',
      exp1: '',
      exp2: '',
      aboutus: '',
    });
  };

  //   getting data from api
  const getData = () => {
    return axios
      .get('https://s3.ajnavidya.com/ajnavidya/contactus/skills.json')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  // remove
  const handleRemove = (index) => {
    const newData = selectedOption.filter((_, ind) => ind !== index);
    setSelectedOption(newData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.parentContainer}>
      <section className={style.section1}>
        {/* {console.log(formData)} */}
        <div className={style.heading}>
          <div className={style.ContactUs}>Contact us</div>
          <div className={style.question}>
            Have Questions? We are here to{' '}
            <span className={style.help}>help! </span>{' '}
          </div>
        </div>
        <div className={style.mainContainer}>
          {/* form */}
          <form action='' onSubmit={handleSubmit} autoComplete='off'>
            {/* training */}

            {/* Which training experience you are interested in? */}
            <div className={style.websiteCont} style={{ paddingTop: '10px' }}>
              <div>
                <div>
                  <label htmlFor='' className={style.webTxt}>
                    Sector*
                  </label>
                </div>
                <select
                  className={style.selctcont}
                  onChange={handleChange}
                  name='exp1'
                  value={selected}
                >
                  {Object.keys(data).map((el) => (
                    <option>{el}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Which training experience you are interested in? */}
            <div className={style.websiteCont} style={{ paddingTop: '10px' }}>
              <div>
                <div>
                  <label htmlFor='' className={style.webTxt}>
                    Jobrole*
                  </label>
                </div>
                <div>
                  <select
                    className={style.selctcont}
                    onChange={handleChange}
                    name='exp2'
                  >
                    {data[selected]?.map((el) => (
                      <option>{el}</option>
                    ))}
                  </select>
                  <div className={style.itemDeleteCont}>
                    {selectedOption.map((item, index) => (
                      <div className={style.itemDelete}>
                        <p>{item}</p>

                        <button
                          onClick={() => handleRemove(index)}
                          className={style.closebtn}
                        >
                          <img src={closeIcon} alt='' />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* first name */}
            <div className={style.flexCont}>
              <div className={style.labelCont}>
                <label htmlFor='' className={style.labelTxt}>
                  Your Name*
                </label>
                <div className={style.input}>
                  <input
                    type='text'
                    name='yourName'
                    value={inputValue.yourName}
                    onChange={handleChange}
                    required
                    placeholder='type your name'
                  />
                </div>
              </div>
              {/* last name */}
              <div className={style.labelCont}>
                <div>
                  <label htmlFor='' className={style.labelTxt}>
                    Job title*
                  </label>
                </div>
                <div className={style.input}>
                  <input
                    type='text'
                    name='jobTitle'
                    value={inputValue.jobTitle}
                    onChange={handleChange}
                    required
                    placeholder='Job Title'
                  />
                </div>
              </div>
            </div>
            {/* organization name */}
            <div className={style.websiteCont} style={{ paddingTop: '10px' }}>
              <div className={style.labelCont}>
                <div>
                  <label htmlFor='' className={style.webTxt}>
                    Organization name*
                  </label>
                </div>
                <div className={style.input1}>
                  <input
                    type='text'
                    className={style.websiteLink}
                    name='organizationName'
                    value={inputValue.organizationName}
                    onChange={handleChange}
                    required
                    placeholder=' organization name'
                  />
                </div>
              </div>
            </div>
            {/* first name */}
            <div className={style.gridCont}>
              <div className={style.labelCont}>
                <label htmlFor='' className={style.labelTxt}>
                  Business email*
                </label>
                <div className={style.input}>
                  <input
                    type='text'
                    name='email'
                    value={inputValue.email}
                    onChange={handleChange}
                    required
                    placeholder='Type your Business email here'
                  />
                </div>
              </div>
              {/* last name */}
              <div className={style.labelCont}>
                <div>
                  <label htmlFor='' className={style.labelTxt}>
                    Contact number*
                  </label>
                </div>
                <div className={style.input}>
                  <input
                    type='text'
                    name='contactNumber'
                    value={inputValue.contactNumber}
                    onChange={handleChange}
                    required
                    placeholder='Type your contact number here'
                  />
                </div>
              </div>
              {/* *** */}
              <div className={style.labelCont}>
                <div>
                  <label htmlFor='' className={style.labelTxt}>
                    City name*
                  </label>
                </div>
                <div className={style.input}>
                  <input
                    type='text'
                    name='cityName'
                    value={inputValue.cityName}
                    onChange={handleChange}
                    required
                    placeholder='Type your City name'
                  />
                </div>
              </div>
              {/* *** */}

              <div className={style.websiteCont} style={{ paddingTop: '10px' }}>
                <div className={style.labelCont}>
                  <label htmlFor='' className={style.webTxt}>
                    Where you heard about us?*
                  </label>
                </div>
                <select
                  className={style.selctcont}
                  onChange={handleChange}
                  name='aboutus'
                >
                  <option required>option1</option>
                  <option
                    // name='aboutus'
                    // value='option2'
                    required
                  >
                    option2
                  </option>
                </select>
              </div>
            </div>

            {/* Mention your purpose below* */}
            <div className={style.MentionyourContainer}>
              <div className={style.mention}>
                Note (if you want to mention anything)
              </div>
              <div className={style.MentionyourInput}>
                <textarea
                  placeholder='Write your message here'
                  className={style.text}
                  name='comment'
                  value={inputValue.comment}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={style.submitBtn}>
              <button>Submit</button>
            </div>
          </form>
          {/* section two */}
          {/* <hr className={style.line} /> */}
          <div className={style.line}></div>
        </div>
        {/* <div className={style.line2}></div> */}
        <div className={style.officeAddressContainer}>
          <div className={style.officeAddressText}>Office Address</div>
          <div className={style.officeAddressCont}>
            <div className={style.officeAddressName}>
              Dimension NXG Private Limited
            </div>
            <div className={style.officeAddress}>
              Office no. 527 & 528, 5th floor, Lodha Supremus 2, Road number 22,
              Wagle Estate, Thane – west, Maharashtra – 400604.{' '}
            </div>
            <div className={style.cin}>CIN: U74999MH2014PTC259269</div>
          </div>
        </div>
      </section>
      {/* map */}
      <div className={style.mapCont}>
        {
          <img
            src={Indiamap}
            alt='indiamap'
            style={{ zIndex: '1', width: '38rem' }}
          />
        }
      </div>
    </div>
  );
};
export default ContactForm;
