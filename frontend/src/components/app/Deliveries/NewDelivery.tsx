import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import NewDeliveryForm, {
  NewDeliveryFormInputs,
  NewDeliverySchema,
} from './NewDeliveryForm';
import { classNames } from '../../../utils/classNames';
import { useAppSelector } from '../../../store/hooks';

interface newDeliveryProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const relevantData = [
  { title: 'Temperatur', id: 'temperature' },
  { title: 'Feuchtigkeit', id: 'humidity' },
  { title: 'Erschütterung', id: 'vibration' },
  { title: 'Neigung', id: 'tilt' },
];

const NewDelivery = ({ open, setOpen }: newDeliveryProps) => {
  const devices = useAppSelector((store) => store.devices.devices);
  const [deliveryType, setDeliveryType] = useState('Kühlfracht');
  const [deliveryDetails, setDeliveryDetails] = useState({
    Temperatur: false,
    Feuchtigkeit: false,
    Erschütterung: false,
    Neigung: false,
  });

  const {
    register,
    setError,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = useForm<NewDeliveryFormInputs>({
    resolver: yupResolver(NewDeliverySchema),
  });

  const { onCreateSubmit } = NewDeliveryForm(setError, setOpen);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full'>
                <h2 className='bg-indigo-600 p-4 text-xl text-white'>
                  Sendungsauftrag
                  <p className='mt-1 max-w-2xl text-sm'>
                    Hier können Sie einen neuen Sendungsauftrag anlegen.
                  </p>
                </h2>
                <form
                  className='space-y-4 divide-y divide-gray-200 p-4'
                  onSubmit={handleSubmit(onCreateSubmit)}
                >
                  <div className='space-y-4 divide-y divide-gray-200 sm:space-y-2'>
                    <div className='pt-2 space-y-1 sm:pt-4'>
                      <div>
                        <h3 className='text-lg leading-6 font-medium text-gray-900'>
                          Allgemeine Informationen
                        </h3>
                        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                          Hier können Sie Informationen zur Sendung festhalten.
                        </p>
                      </div>
                      <div className=' sm:border-t sm:border-gray-200 sm:pt-1'>
                        <label
                          htmlFor='fromLocation'
                          className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-1'
                        >
                          Produktart
                        </label>
                        <div className='mt-2 mb-2 sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                          <select
                            {...register('productType', {})}
                            id='productType'
                            name='productType'
                            className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                            onChange={(e) => setDeliveryType(e.target.value)}
                          >
                            <option key='refrigeratedCargo'>Kühlfracht</option>
                            <option key='moistureSensitive'>
                              Feuchtigkeitsempfindlich
                            </option>
                            <option key='fragile'>Zerbrechlich</option>
                            <option key='custom'>Individuell</option>
                          </select>
                          <div className='text-red-500'>
                            {errors.productType?.message}
                          </div>
                        </div>
                      </div>
                      <div className=' sm:border-t sm:border-gray-200 sm:pt-1'>
                        <label
                          htmlFor='fromLocation'
                          className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-1'
                        >
                          Überwachungsmodul
                        </label>
                        <div className='mt-2 mb-2 sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                          <select
                            {...register('deviceID', {})}
                            id='deviceID'
                            name='deviceID'
                            className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                          >
                            {devices.map(function (item: any, _i: any) {
                              return (
                                <option key={item._id} value={item._id}>
                                  {item.displayName}
                                </option>
                              );
                            })}
                          </select>
                          <div className='text-red-500'>
                            {errors.deviceID?.message}
                          </div>
                        </div>
                      </div>
                      <div className=' sm:border-t sm:border-gray-200 sm:pt-1'>
                        <label
                          htmlFor='fromLocation'
                          className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-1'
                        >
                          Beschreibung der Sendung
                        </label>
                        <div className='mt-2 mb-2 sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                          <textarea
                            {...register('productDescription', {})}
                            id='productDescription'
                            name='productDescription'
                            rows={3}
                            className={classNames(
                              !errors.productDescription
                                ? 'border-gray-300'
                                : 'border-red-500',
                              'block w-full shadow-sm sm:text-sm focus:ring-indigo-400 focus:border-indigo-400 rounded-md',
                            )}
                            placeholder='Beschreibung der Sendung einfügen.'
                          />
                          <div className='text-red-500'>
                            {errors.productDescription?.message}
                          </div>
                        </div>
                      </div>
                      <div className=' sm:border-t sm:border-gray-200 sm:pt-1'>
                        <label
                          htmlFor='fromLocation'
                          className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-1'
                        >
                          Ausgangsort
                        </label>
                        <div className='mt-2 mb-2 sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                          <input
                            {...register('fromLocation', {})}
                            type='text'
                            name='fromLocation'
                            id='fromLocation'
                            className={classNames(
                              !errors.fromLocation
                                ? 'border-gray-300'
                                : 'border-red-500',
                              'block w-full shadow-sm sm:text-sm focus:ring-indigo-400 focus:border-indigo-400 rounded-md',
                            )}
                            placeholder='Fliederstraße 32, 75839 Buxtehude, DE'
                          />
                          <div className='text-red-500'>
                            {errors.fromLocation?.message}
                          </div>
                        </div>
                      </div>
                      <div className=' sm:border-t sm:border-gray-200 sm:pt-1'>
                        <label
                          htmlFor='toLocation'
                          className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-1'
                        >
                          Zielort
                        </label>
                        <div className='mt-2 mb-2 sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                          <input
                            {...register('toLocation', {})}
                            type='text'
                            name='toLocation'
                            id='toLocation'
                            className={classNames(
                              !errors.toLocation
                                ? 'border-gray-300'
                                : 'border-red-500',
                              'block w-full shadow-sm sm:text-sm focus:ring-indigo-400 focus:border-indigo-400 rounded-md',
                            )}
                            placeholder='Fliederstraße 99, 75839 Buxtehude, DE'
                          />
                          <div className='text-red-500'>
                            {errors.toLocation?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=' sm:border-t sm:border-gray-200 sm:pt-1'>
                      <label
                        htmlFor='id'
                        className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-1'
                      >
                        Sedungsnummer
                      </label>
                      <div className='mt-2 mb-2 sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                        <input
                          {...register('shippingId', {})}
                          type='text'
                          name='shippingId'
                          id='shippingId'
                          className={classNames(
                            !errors.shippingId
                              ? 'border-gray-300'
                              : 'border-red-500',
                            'block w-full shadow-sm sm:text-sm focus:ring-indigo-400 focus:border-indigo-400 rounded-md',
                          )}
                          placeholder='23908489040404'
                        />
                        <div className='text-red-500'>
                          {errors.shippingId?.message}
                        </div>
                      </div>
                    </div>
                    <div className=' sm:border-t sm:border-gray-200 sm:pt-1'>
                      <label
                        htmlFor='id'
                        className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-1'
                      >
                        E-Mail für Benachrichtigungen
                      </label>
                      <div className='mt-2 mb-2 sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                        <input
                          {...register('ownerMail', {})}
                          type='text'
                          name='ownerMail'
                          id='ownerMail'
                          className={classNames(
                            !errors.ownerMail
                              ? 'border-gray-300'
                              : 'border-red-500',
                            'block w-full shadow-sm sm:text-sm focus:ring-indigo-400 focus:border-indigo-400 rounded-md',
                          )}
                          placeholder='luisschmitt01@gmail.com'
                        />
                        <div className='text-red-500'>
                          {errors.ownerMail?.message}
                        </div>
                      </div>
                    </div>
                    {deliveryType === 'Individuell' && (
                      <div className='divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5'>
                        <div>
                          <h3 className='text-lg leading-6 font-medium text-gray-900'>
                            Überwachungsfunktion
                          </h3>
                          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                            Hier können Sie definieren, welche Parameter für die
                            Sendung relevant sind.
                          </p>
                        </div>
                        <div className='space-y-6 sm:space-y-5 divide-y divide-gray-200'>
                          <div className='pt-6 sm:pt-2'>
                            <div role='group' aria-labelledby='label-ownerMail'>
                              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline'>
                                <div>
                                  <div
                                    className='text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700'
                                    id='label-ownerMail'
                                  >
                                    Relevante Parameter
                                  </div>
                                </div>
                                <div className='mt-4 sm:mt-0 sm:col-span-2'>
                                  <div className='max-w-lg space-y-4'>
                                    {relevantData.map((element) => (
                                      <div className='relative flex items-start'>
                                        <div className='flex items-center h-5'>
                                          <input
                                            id={element.title}
                                            name={element.title}
                                            type='checkbox'
                                            className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                                            checked={
                                              deliveryDetails[element.title]
                                            }
                                            onChange={() =>
                                              setDeliveryDetails({
                                                Temperatur:
                                                  element.title === 'Temperatur'
                                                    ? !deliveryDetails.Temperatur
                                                    : deliveryDetails.Temperatur,
                                                Feuchtigkeit:
                                                  element.title ===
                                                  'Feuchtigkeit'
                                                    ? !deliveryDetails.Feuchtigkeit
                                                    : deliveryDetails.Feuchtigkeit,
                                                Erschütterung:
                                                  element.title ===
                                                  'Erschütterung'
                                                    ? !deliveryDetails.Erschütterung
                                                    : deliveryDetails.Erschütterung,
                                                Neigung:
                                                  element.title === 'Neigung'
                                                    ? !deliveryDetails.Neigung
                                                    : deliveryDetails.Neigung,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className='ml-3 text-sm'>
                                          <label
                                            htmlFor='comments'
                                            className='font-medium text-gray-700'
                                          >
                                            {element.title}
                                          </label>
                                          {deliveryDetails[element.title] && (
                                            <div className='grid grid-cols-2 gap-1'>
                                              <div>
                                                <label
                                                  htmlFor='id'
                                                  className='block text-sm font-medium text-gray-500 sm:mt-px sm:pt-1'
                                                >
                                                  Min-Wert
                                                </label>
                                                <div className='sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                                                  <input
                                                    {...register(
                                                      `constraints.${element.id}.criticalMinimum`,
                                                      {},
                                                    )}
                                                    type='number'
                                                    name={`constraints.${element.id}.criticalMinimum`}
                                                    id={`constraints.${element.id}.criticalMinimum`}
                                                    className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                                                  />
                                                </div>
                                              </div>
                                              <div>
                                                <label
                                                  htmlFor='id'
                                                  className='block text-sm font-medium text-gray-500 sm:mt-px sm:pt-1'
                                                >
                                                  Max-Wert
                                                </label>
                                                <div className='sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                                                  <input
                                                    {...register(
                                                      `constraints.${element.id}.criticalMaximum`,
                                                      {},
                                                    )}
                                                    type='number'
                                                    name={`constraints.${element.id}.criticalMaximum`}
                                                    id={`constraints.${element.id}.criticalMaximum`}
                                                    className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                                                  />
                                                </div>
                                              </div>
                                              <div>
                                                <label
                                                  htmlFor='id'
                                                  className='block text-sm font-medium text-gray-500 sm:mt-px sm:pt-1'
                                                >
                                                  Min-Warnschwelle
                                                </label>
                                                <div className='sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                                                  <input
                                                    {...register(
                                                      `constraints.${element.id}.warningThresholdLow`,
                                                      {},
                                                    )}
                                                    type='number'
                                                    name='`constraints.${element.id}.warningThresholdLow`'
                                                    id='`constraints.${element.id}.warningThresholdLow`'
                                                    className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                                                  />
                                                </div>
                                              </div>
                                              <div>
                                                <label
                                                  htmlFor='id'
                                                  className='block text-sm font-medium text-gray-500 sm:mt-px sm:pt-1'
                                                >
                                                  Max-Warnschwelle
                                                </label>
                                                <div className='sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                                                  <input
                                                    {...register(
                                                      `constraints.${element.id}.warningThresholdHigh`,
                                                      {},
                                                    )}
                                                    type='number'
                                                    name={`constraints.${element.id}.warningThresholdHigh`}
                                                    id={`constraints.${element.id}.warningThresholdHigh`}
                                                    className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                                                  />
                                                </div>
                                              </div>
                                              <div>
                                                <label
                                                  htmlFor='id'
                                                  className='block text-sm font-medium text-gray-500 sm:mt-px sm:pt-1 truncate'
                                                >
                                                  Max-Überschreitungen
                                                </label>
                                                <div className='sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                                                  <input
                                                    {...register(
                                                      `constraints.${element.id}.exceedCountUntilIncident`,
                                                      {},
                                                    )}
                                                    type='number'
                                                    name={`constraints.${element.id}.exceedCountUntilIncident`}
                                                    id={`constraints.${element.id}.exceedCountUntilIncident`}
                                                    className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                                                  />
                                                </div>
                                              </div>
                                              <div>
                                                <label
                                                  htmlFor='id'
                                                  className='block text-sm font-medium text-gray-500 sm:mt-px sm:pt-1 truncate'
                                                >
                                                  Max-Dauer
                                                </label>
                                                <div className='sm:col-span-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'>
                                                  <input
                                                    {...register(
                                                      `constraints.${element.id}.exceedMinutesUntilIncident`,
                                                      {},
                                                    )}
                                                    type='text'
                                                    name={`constraints.${element.id}.exceedMinutesUntilIncident`}
                                                    id={`constraints.${element.id}.exceedMinutesUntilIncident`}
                                                    className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='pt-5'>
                    <div className='flex justify-end'>
                      <button
                        type='button'
                        className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        onClick={() => setOpen(false)}
                      >
                        Abbrechen
                      </button>
                      <button
                        type='submit'
                        className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      >
                        Anlegen
                      </button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NewDelivery;
