import { useState } from 'react';
import closeIcon from '../assets/close.svg';

type AboutCardProps = {
  title?: string;
  content?: string;
};

// TODO refactor this!!
export default function AboutCard({ title, content }: AboutCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    console.log('close');
    setIsOpen(false);
  };

  return (
    <div className={isOpen ? 'fixed inset-2 flex z-50 !m-0' : ''}>
      {isOpen && (
        <button className="absolute top-2 right-2" onClick={() => close()}>
          <img className="w-12" src={closeIcon} alt="close-button" />
        </button>
      )}

      <div className="bg-white rounded-3xl border-black border-solid border-4 p-6 overflow-hidden" onClick={open}>
        <div className="overflow-auto h-full">
          <h1 className="font-bold">{title || 'Title'}</h1>
          <p className={`mx-2 ${isOpen || 'multiline-truncate-4'}`}>
            {content ||
              'About Content Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt laboriosam dolore molestiae assumenda neque ipsam, cupiditate similique, dicta amet odit maiores doloribus rem illo, repellendus quaerat aut. Magnam, libero iure. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia tempora quos possimus sint eaque voluptatum, temporibus ipsam, repudiandae in accusamus corrupti eveniet. Praesentium error doloribus vitae. Velit magnam pariatur laboriosam! Iste magnam cumque dolore at natus minima molestiae quidem nisi voluptatum commodi et impedit sint eos voluptate laboriosam voluptas, magni expedita quasi consequatur debitis a laudantium, dicta similique harum. Doloremque? Ipsa nam mollitia ullam deserunt sequi cum tenetur delectus ratione voluptatibus similique earum dolorum ab molestiae maiores ut dicta, debitis repellat voluptatem voluptates. Quis porro sapiente facere eveniet animi sint. Sit laboriosam libero fuga cupiditate ut porro perferendis possimus dolore animi, recusandae cumque distinctio aspernatur aliquam odio numquam nemo quaerat? Enim voluptate exercitationem laudantium, modi assumenda culpa dolorum est quam. Neque explicabo modi quaerat veritatis et natus hic eum qui inventore iusto? Iste magni temporibus harum, dignissimos eligendi, aut eaque ut perferendis sed obcaecati aliquam mollitia necessitatibus culpa error. Soluta.'}
          </p>
        </div>
      </div>
    </div>
  );
}
