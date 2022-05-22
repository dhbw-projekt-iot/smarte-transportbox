import Picture from '../assets/picture_landing.svg';
import PictureLuis from '../../assets/picture_luis.png';
import Navbar from './Navbar';

const people = [
  {
    name: 'Malo Naujoks',
    role: 'Entwickler',
    imagePath: PictureLuis,
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
  },
  {
    name: 'Konrad Koschel',
    role: 'Entwickler',
    imagePath: PictureLuis,
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
  },
  {
    name: 'Patrick Pfenningsdorf',
    role: 'Entwickler',
    imagePath: PictureLuis,
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
  },
  {
    name: 'Jens Huber',
    role: 'Entwickler',
    imagePath: PictureLuis,
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
  },
  {
    name: 'Luis Schmitt',
    role: 'Entwickler',
    imagePath: PictureLuis,
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
  },
];

const pages = [
  {
    name: 'Produkte',
    link: '#',
  },
  {
    name: 'Community',
    link: '#',
  },
  {
    name: 'Über Uns',
    link: '#',
  },
];

const Landing = () => {
  return (
    <div className='min-h-screen'>
      <main>
        <Navbar sites={pages} />
        <div className='lg:overflow-hidden'>
          <div className='bg-gradient-to-t from-blue-700 to-purple-500'>
            <div className='mx-auto max-w-7xl lg:px-8'>
              <div className='lg:grid lg:grid-cols-2 lg:gap-8'>
                <div className='mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center'>
                  <div className='pt-20 pb-8'>
                    <h1 className='mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-5xl'>
                      <span>
                        Transportüberwachung für Ihr{' '}
                        <span className='text-sky-500'>Unternehmen</span>
                      </span>
                    </h1>
                    <p className='mt-3 text-base text-gray-100 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl'>
                      Wir befinden uns gerade im Entwicklungsprozess der
                      intelligenten Transportbox. Auf unserer Website
                      präsentieren wie Updates und die Fortschritte im
                      Entwicklugnsprozess.
                    </p>
                    <div className='mt-10 sm:mt-12'>
                      <form
                        action='#'
                        className='sm:max-w-xl sm:mx-auto lg:mx-0'
                      >
                        <div className='sm:flex'>
                          <div className='min-w-0 flex-1'>
                            <label htmlFor='email' className='sr-only'>
                              Email address
                            </label>
                            <input
                              id='email'
                              type='email'
                              placeholder='Gib deine Email-Adresse ein'
                              className='block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900'
                            />
                          </div>
                          <div className='mt-3 sm:mt-0 sm:ml-3'>
                            <button
                              type='submit'
                              className='block w-full py-3 px-4 rounded-md shadow bg-gray-800 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900'
                            >
                              Schreib mir
                            </button>
                          </div>
                        </div>
                        <p className='mt-3 text-sm text-gray-100 sm:mt-4'>
                          Wir achten auf den Schutz deiner Daten! Hier kannst du
                          unsere{' '}
                          <a href='/' className='font-medium text-white'>
                            Datenschutzubestimmungen
                          </a>{' '}
                          lesen.
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='mt-12 mb-0 sm:-mb-0 lg:m-0 lg:relative'>
                  <div className='flex justify-center mt-6 mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0'>
                    <img
                      className='w-5/6 lg:absolute lg:py-12 lg:h-5/6 lg:w-auto'
                      src={Picture}
                      alt=''
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <svg
            id='visual'
            viewBox='0 0 1440 125'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0 114L10 110.3C20 106.7 40 99.3 60 98C80 96.7 100 101.3 120 92.2C140 83 160 60 180 45.5C200 31 220 25 240 23.5C260 22 280 25 300 33C320 41 340 54 360 59.5C380 65 400 63 420 60.5C440 58 460 55 480 49.2C500 43.3 520 34.7 540 42C560 49.3 580 72.7 600 84C620 95.3 640 94.7 660 86.3C680 78 700 62 720 63.7C740 65.3 760 84.7 780 90.2C800 95.7 820 87.3 840 89.7C860 92 880 105 900 110C920 115 940 112 960 110.2C980 108.3 1000 107.7 1020 97C1040 86.3 1060 65.7 1080 55.5C1100 45.3 1120 45.7 1140 48.7C1160 51.7 1180 57.3 1200 68.2C1220 79 1240 95 1260 97.2C1280 99.3 1300 87.7 1320 85.8C1340 84 1360 92 1380 99.3C1400 106.7 1420 113.3 1430 116.7L1440 120L1440 0L1430 0C1420 0 1400 0 1380 0C1360 0 1340 0 1320 0C1300 0 1280 0 1260 0C1240 0 1220 0 1200 0C1180 0 1160 0 1140 0C1120 0 1100 0 1080 0C1060 0 1040 0 1020 0C1000 0 980 0 960 0C940 0 920 0 900 0C880 0 860 0 840 0C820 0 800 0 780 0C760 0 740 0 720 0C700 0 680 0 660 0C640 0 620 0 600 0C580 0 560 0 540 0C520 0 500 0 480 0C460 0 440 0 420 0C400 0 380 0 360 0C340 0 320 0 300 0C280 0 260 0 240 0C220 0 200 0 180 0C160 0 140 0 120 0C100 0 80 0 60 0C40 0 20 0 10 0L0 0Z'
              fill='#1d4ed8'
              stroke-linecap='round'
              stroke-linejoin='miter'
            ></path>
          </svg>
        </div>
        <div className='bg-white'>
          <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
            <div className='space-y-12'>
              <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                Triff unser Team
              </h2>
              <ul className='space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0'>
                {people.map((person) => (
                  <li key={person.name}>
                    <div className='space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8'>
                      <div className='h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4'>
                        <img
                          className='object-cover shadow-lg rounded-lg'
                          src={person.imagePath}
                          alt=''
                        />
                      </div>
                      <div className='sm:col-span-2'>
                        <div className='space-y-4'>
                          <div className='text-lg leading-6 font-medium space-y-1'>
                            <h3>{person.name}</h3>
                            <p className='text-indigo-600'>{person.role}</p>
                          </div>
                          <div className='text-lg'>
                            <p className='text-gray-500'>{person.bio}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
