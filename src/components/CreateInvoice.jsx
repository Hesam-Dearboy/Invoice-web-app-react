import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AddItem from './AddItem'
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from 'react-redux';
import invoiceSlice from '../redux/invoiceSlice';
import { validateSenderStreetAddress, validateSenderPostCode, validateSenderCity, validateCLientEmail, validateCLientName, validateClientCity, validateClientPostCode, validateClientStreetAddress, validateItemCount, validateItemName, validateItemPrice, validateSenderCountry, validateClientCountry } from '../functions/createInvoiceValidator'


function CreateInvoice({ openCreateInvoice, setOpenCreateInvoice, invoice, type }) {
    const dispatch = useDispatch()


    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isValidatorActive, setIsValidatorActive] = useState(false)
    const [isValid, setIsValid] = useState(true)


    const [filterValue, setfilterValue] = useState('')
    const deliveryTimes = [
        { text: 'Next 1 day', value: 1 },
        { text: 'Next 7 day', value: 7 },
        { text: 'Next 14 day', value: 14 },
        { text: 'Next 30 day', value: 30 },
    ]
    const [senderStreet, setSenderStreet] = useState('')
    const [senderCity, setSenderCity] = useState('')
    const [senderPostCode, setSenderPostCode] = useState('')
    const [senderCountry, setSenderCountry] = useState('')


    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')

    const [clientStreet, setClientStreet] = useState('')
    const [clientCity, setClientCity] = useState('')
    const [clientPostCode, setClientPostCode] = useState('')
    const [clientCountry, setClientCountry] = useState('')
    const [description, setDescription] = useState('')

    const [selectDeliveryDate, setSelectDeliveryDate] = useState('')
    const [paymentTerms, setpaymentTerms] = useState(deliveryTimes[0].value)

    const [item, setItem] = useState(
        [
            {
                'name': "",
                'quantity': 1,
                'price': 0,
                'total': 0,
                id: uuidv4()
            }
        ]
    )
    const onDelete = (id) => {
        setItem((pervState) => pervState.filter((el) => el.id !== id))
    }

    const handelOnChange = (id, e) => {
        let data = [...item]

        let foundData = data.find((el) => el.id === id)

        if (e.target.name === 'quantity' || 'price') {
            foundData[e.target.name] = e.target.value
            foundData['total'] = (
                Number(foundData.quantity) * Number(foundData.price)
            ).toFixed(2)
        } else {
            foundData[e.target.name] = e.target.value
        }

        setItem(data);
    }

    const onSubmit = () => {
        if (type === 'edit') {
            dispatch(invoiceSlice.actions.editInvoice({
                description,
                paymentTerms,
                clientName,
                clientEmail,
                senderStreet,
                senderCity,
                senderPostCode,
                senderCountry,
                clientStreet,
                clientCity,
                clientPostCode,
                clientCountry,
                item,
                id: invoice.id,
            }))
            setOpenCreateInvoice(false)
        } else {

            dispatch(invoiceSlice.actions.addInvoice({
                description,
                paymentTerms,
                clientName,
                clientEmail,
                senderStreet,
                senderCity,
                senderPostCode,
                senderCountry,
                clientStreet,
                clientCity,
                clientPostCode,
                clientCountry,
                item,
            }))
            dispatch(invoiceSlice.actions.filterInvoice({ status: filterValue }))

        }


    }


    if (type === 'edit' && isFirstLoad) {
        const updatedItemsArray = invoice.items.map((obj, index) => {
            return { ...obj, id: index + 1 };
        });



        setClientName(invoice.clientName)
        setClientCity(invoice.clientAddress.city)
        setClientStreet(invoice.clientAddress.street)
        setClientPostCode(invoice.clientAddress.postCode)
        setClientCountry(invoice.clientAddress.country)
        setClientEmail(invoice.clientEmail)
        setpaymentTerms(invoice.paymentTerms)
        setDescription(invoice.description)
        setSenderCity(invoice.senderAddress.city)
        setSenderStreet(invoice.senderAddress.street)
        setSenderCountry(invoice.senderAddress.country)
        setSenderPostCode(invoice.senderAddress.postCode)
        setItem(updatedItemsArray)

        setIsFirstLoad(false)
    }


    function itemsValidator() {
        const itemName = item.map(i => validateItemName(i.name))
        const itemCount = item.map(i => validateItemCount(i.quantity))
        const itemPrice = item.map(i => validateItemPrice(i.price))

        const allItemsElement = itemCount.concat(itemPrice, itemName)

        return (allItemsElement.includes(false) === true ? false : true)
    }



    function validator() {
        if (validateSenderStreetAddress(senderStreet) && validateSenderPostCode(senderPostCode) && validateSenderCity(senderCity) && validateCLientEmail(clientEmail) && validateCLientName(clientName) && validateClientCity(clientCity) && validateClientPostCode(clientPostCode) && validateClientStreetAddress(clientStreet) && validateSenderCountry(senderCountry) && validateClientCountry(clientCountry) && itemsValidator()) {
            return true
        }
        return false
    }


    return (
        <div onClick={(e) => {
            if (e.target !== e.currentTarget) {
                return;
            }
            setOpenCreateInvoice(false);
        }}
            className='  fixed top-0 bottom-0 left-0 right-0  bg-[#000005be]'>

            <motion.div
                key='createInvoice-sidebar'
                initial={{ x: -500, opacity: 0 }}
                animate={{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 40, duration: .4 } }
                }
                exit={{ x: -700, transition: { duration: .2 } }}
                className='  scrollbar-hide flex flex-col dark:text-white dark:bg-[#141625] bg-white  md:pl-[150px] py-16 px-6 h-screen md:w-[768px] md:rounded-r-3xl'
            >

                <h1 className=' font-semibold dark:text-white text-3xl'>
                    {type == 'edit' ? 'Edit' : 'Create'} Invoice
                </h1>

                <div className=' overflow-y-scroll scrollbar-hide my-14'>
                    <h1 className=' text-[#7c5dfa] mb-4 font-medium'>
                        Bill From
                    </h1>

                    <div className=' grid grid-cols-3 mx-1  space-y-4 '>

                        <div className=' flex flex-col col-span-3'>
                            <label className=' text-gray-400 font-light'>
                                Street Address
                            </label>
                            <input value={senderStreet} id='senderStreet' onChange={(e) => setSenderStreet(e.target.value)} type='text' className={`dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none  dark:border-gray-800 ${isValidatorActive && !validateSenderStreetAddress(senderStreet) && ' border-red-500 dark:border-red-500 outline-red-500 border-2'}`} />
                        </div>

                        <div className=' flex flex-col mr-4 col-span-1'>
                            <label className=' text-gray-400 font-light'>
                                City
                            </label>
                            <input type='text' value={senderCity} onChange={(e) => setSenderCity(e.target.value)} className={`dark:bg-[#1e2139] py-2 px-4 border-[.2px] focus:outline-none  rounded-lg  focus:outline-purple-400 border-gray-300 ${isValidatorActive && !validateSenderCity(senderCity) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`} />
                        </div>
                        <div className=' flex flex-col mr-4 col-span-1'>
                            <label className=' text-gray-400 font-light'>
                                Post Code
                            </label>
                            <input type='text' value={senderPostCode} onChange={(e) => setSenderPostCode(e.target.value)} className={` dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none  focus:outline-purple-400 border-gray-300 ${isValidatorActive && !validateSenderPostCode(senderPostCode) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`} />
                        </div>
                        <div className=' flex flex-col col-span-1'>
                            <label className=' text-gray-400 font-light'>
                                Country
                            </label>
                            <input type='text' value={senderCountry} onChange={(e) => setSenderCountry(e.target.value)} className={` dark:bg-[#1e2139] py-2 px-4 border-[.2px] focus:outline-none  rounded-lg  focus:outline-purple-400 ${isValidatorActive && !validateSenderCountry(senderCountry) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} border-gray-300 dark:border-gray-800`} />
                        </div>


                    </div>

                    {/* Bill to Section */}

                    <h1 className=' text-[#7c5dfa] my-4 mt-10 font-medium'>
                        Bill To
                    </h1>

                    <div className=' grid grid-cols-3 mx-1   space-y-4 '>
                        <div className=' flex flex-col col-span-3'>
                            <label className=' text-gray-400 font-light'>
                                Client Name
                            </label>
                            <input type='text' value={clientName} onChange={(e) => setClientName(e.target.value)} className={` dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateCLientName(clientName) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'}   dark:border-gray-800`} />
                        </div>

                        <div className=' flex flex-col   col-span-3'>
                            <label className=' text-gray-400 font-light'>
                                Client Email
                            </label>
                            <input type='text' value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className={` dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateCLientEmail(clientEmail) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'}   dark:border-gray-800`} />
                        </div>

                        <div className=' flex flex-col col-span-3'>
                            <label className=' text-gray-400 font-light'>
                                Street Address
                            </label>
                            <input type='text' value={clientStreet} onChange={(e) => setClientStreet(e.target.value)} className={` dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateClientStreetAddress(clientStreet) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'}   dark:border-gray-800`} />
                        </div>

                        <div className=' flex flex-col mr-4 col-span-1'>
                            <label className=' text-gray-400 font-light'>
                                City
                            </label>
                            <input type='text' value={clientCity} onChange={(e) => setClientCity(e.target.value)} className={` dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateClientCity(clientCity) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'}   dark:border-gray-800`} />
                        </div>
                        <div className=' flex flex-col mr-4 col-span-1'>
                            <label className=' text-gray-400 font-light'>
                                Post Code
                            </label>
                            <input type='text' value={clientPostCode} onChange={(e) => setClientPostCode(e.target.value)}
                                className={` dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateClientPostCode(clientPostCode) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'}   dark:border-gray-800`}
                            />
                        </div>
                        <div className=' flex flex-col col-span-1'>
                            <label className=' text-gray-400 font-light'>
                                Country
                            </label>
                            <input type='text' value={clientCountry} onChange={(e) => setClientCountry(e.target.value)}
                                className={` dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateClientCountry(clientCountry) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'}   dark:border-gray-800`} />
                        </div>


                    </div>

                    <div className=' grid mx-1 grid-cols-2 mt-8 '>
                        <div className=' flex flex-col '>
                            <label className=' text-gray-400 font-light'>
                                Invoice Date
                            </label>
                            <input type='date' value={selectDeliveryDate} onChange={(e) => setSelectDeliveryDate(e.target.value)} className=' dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none  dark:border-gray-800 dark:text-white  mr-4' />
                        </div>

                        <div className=' mx-auto w-full'>
                            <label className=' text-gray-400 font-light'>
                                Payment Terms
                            </label>
                            <select value={paymentTerms} onChange={(e) => setpaymentTerms(e.target.value)} className=' appearance-none w-full py-2 px-4 border-[.2px] rounded-lg focus:outline-none  dark:bg-[#1e2139] dark:text-white dark:border-gray-800  focus:outline-purple-400 border-gray-300 select-status' >
                                {deliveryTimes.map(time => (
                                    <option value={time.value}>
                                        {time.text}
                                    </option>
                                ))}
                            </select>
                        </div>


                    </div>

                    <div className=' mx-1 mt-4 flex flex-col '>
                        <label className=' text-gray-400 font-light'>
                            Description
                        </label>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} type='text' className=' dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white' />
                    </div>

                    {/* Item List Section */}

                    <h2 className=' text-2xl text-gray-500 mt-10 '>
                        Item List
                    </h2>
                    {item.map((itemDetails, index) => (
                        <div className=' border-b pb-2 border-gray-300 mb-4 '>
                            <AddItem isValidatorActive={isValidatorActive} key={index} handelOnChange={handelOnChange} setItem={setItem} onDelete={onDelete} itemDetails={itemDetails} />
                        </div>
                    ))}



                    <button
                        onClick={() => {
                            setItem(
                                (state) => [
                                    ...state,
                                    {
                                        name: "",
                                        quantity: 1,
                                        price: 0,
                                        total: 0,
                                        id: uuidv4()
                                    }]
                            )
                        }}
                        className=' bg-gray-200  hover:opacity-80 mx-auto py-2 items-center dark:text-white dark:bg-[#252945] justify-center rounded-xl  w-full mt-6'>
                        + Add New Item
                    </button>

                </div>

                <div className=' flex  justify-between'>
                    <div>
                        <button
                            onClick={() => {
                                setOpenCreateInvoice(false)
                            }}
                            className=' bg-gray-200  hover:opacity-80 mx-auto py-4 items-center dark:text-white  dark:bg-[#252945] justify-center  px-8 rounded-full '>
                            Discard
                        </button>
                    </div>

                    <div>
                        <button className=' text-white  hover:opacity-80 mx-auto py-4 items-center bg-[#7c5dfa] justify-center  px-8 rounded-full ' onClick={() => {
                            const isValid = validator()
                            setIsValidatorActive(true)
                            if (isValid) {
                                onSubmit()
                                setOpenCreateInvoice(false)
                            }
                        }}>
                            Save & Send
                        </button>
                    </div>
                </div>



            </motion.div>

        </div>
    )
}

export default CreateInvoice