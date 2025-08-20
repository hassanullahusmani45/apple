import { FaBrain } from 'react-icons/fa'
import { HiOutlineCircleStack, HiOutlineShieldCheck } from 'react-icons/hi2'
import { RiComputerLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchCategoryCount } from '../redux/slices/articleCategoryCount'
import { useEffect } from 'react';

export default function GaregoryCount() {

    const dispatch = useAppDispatch();
    const { security, frontend, backend, artificialIntelligence, fetched } = useAppSelector((state) => state.categoryCount);


    useEffect(() => {
        // if (!fetched) {
        dispatch(fetchCategoryCount());
        // }
    }, [dispatch]);
    return (


        <div className='grid grid-cols-4 gap-x-6 py-8 text-white'>

            <Link to={"/posts"} className='flex flex-col justify-center items-center py-5 bg-gradient-to-r from-[#3564ff] to-[#62f229] overflow-hidden rounded-xl shadow-md shadow-slate-400'>
                <HiOutlineShieldCheck className='size-12 mb-3' />
                <div className=' font-medium'>{security}</div>
                <div className='text-base font-semibold'>Security</div>
            </Link>

            <Link to={"/posts"} className='flex flex-col justify-center items-center py-5 bg-gradient-to-r from-[#5bf0ca] to-[#0b75ee] overflow-hidden rounded-xl shadow-md shadow-slate-400'>
                <RiComputerLine className='size-12 mb-3' />
                <div className=' font-medium'>{frontend}</div>
                <div className='text-base font-semibold'>Frontend</div>
            </Link>

            <Link to={"/posts"} className='flex flex-col justify-center items-center py-5 bg-gradient-to-r from-[#9e4bc5] to-[#60d6f3] overflow-hidden rounded-xl shadow-md shadow-slate-400'>
                <HiOutlineCircleStack className='size-12 mb-3' />
                <div className=' font-medium'>{backend}</div>
                <div className='text-base font-semibold'>Backend</div>
            </Link>

            <Link to={"/posts"} className='flex flex-col justify-center items-center py-5 bg-gradient-to-r from-[#f1ce59] to-[#f04d75] overflow-hidden rounded-xl  shadow-md shadow-slate-400'>
                <FaBrain className='size-12 mb-3' />
                <div className='font-medium'>{artificialIntelligence}</div>
                <div className='text-base font-semibold'>Artificial intelligence</div>
            </Link>

        </div>
    )
}
