import * as yup from 'yup';
import { useForm, UseFormSetError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../../store/hooks';
import {
  coolFreightConstraints,
  fragileFreightConstraints,
  humidSensibleFreightConstraints,
} from './Delivery/defaultConstraints';
import axios from 'axios';
import { BACKEND_URL } from '../../../config/envVars';
import { fetchTransportationTasks } from '../../../store/transportationTaskSlice';

export type NewDeliveryFormInputs = {
  productType: string;
  productDescription: string;
  fromLocation: string;
  toLocation: string;
  shippingId: string;
  deviceID: string;
  ownerMail: string;
  constraints: any;
};

export const NewDeliverySchema = yup.object().shape({
  productType: yup
    .string()
    .typeError('Die Produktart muss angegeben werden.')
    .required('Die Produktart muss angegeben werden.'),
  productDescription: yup
    .string()
    .typeError('Eine Beschreibung ist erforderlich.')
    .required('Eine Beschreibung ist erforderlich.'),
  fromLocation: yup
    .string()
    .typeError('Der Startort muss angegeben werden.')
    .required('Der Startort muss angegeben werden.'),
  toLocation: yup
    .string()
    .typeError('Der Zielort muss angegeben werden.')
    .required('Der Zielort muss angegeben werden.'),
  shippingId: yup
    .string()
    .typeError('Die Sendungsnummer muss angegeben werden.')
    .required('Die Sendungsnummer muss angegeben werden.'),
  ownerMail: yup
    .string()
    .typeError('Eine ownerMail muss angegeben werden.')
    .required('Eine ownerMail muss angegeben werden.'),
});

const NewDeliveryForm = (
  setError: UseFormSetError<NewDeliveryFormInputs>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  let dispatch = useAppDispatch();

  const {
    formState: { errors },
  } = useForm<NewDeliveryFormInputs>({
    resolver: yupResolver(NewDeliverySchema),
  });

  const onCreateSubmit = async (data: NewDeliveryFormInputs) => {
    try {
      let dataRequest = data;

      if (dataRequest.productType === 'Individuell') {
      } else if (dataRequest.productType === 'Kühlfracht') {
        dataRequest.constraints = coolFreightConstraints;
      } else if (dataRequest.productType === 'Feuchtigkeitsempfindlich') {
        dataRequest.constraints = humidSensibleFreightConstraints;
      } else if (dataRequest.productType === 'Zerbrechlich') {
        dataRequest.constraints = fragileFreightConstraints;
      }
      const response = await axios.post(
        BACKEND_URL + '/public/tasks',
        dataRequest,
      );
      setOpen(false);
      dispatch(fetchTransportationTasks());
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    onCreateSubmit,
  };
};

export default NewDeliveryForm;
