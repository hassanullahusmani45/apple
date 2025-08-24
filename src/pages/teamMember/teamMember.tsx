import { useParams } from 'react-router-dom'
import TeamMemberSidebar from '../../components/TeamMemberSidebar';

export default function TeamMemmber() {
  const { id } = useParams();
  console.log(id);
  return (
    <div className=''>
      <div className=' grid grid-cols-7 gap-4'>
          
          <TeamMemberSidebar author={author} />

          <div className='col-span-5 rounded-xl  bg-slate-800'>

            <div className='p-8'>
              <div className=' text-lg font-serif my-8'>Hi there! I’m {author.fullName} 🖐</div>
              <div className='text-base text-slate-300'>{author.info}</div>
            </div>

           
          </div>
        </div>
    </div>
  )
}

