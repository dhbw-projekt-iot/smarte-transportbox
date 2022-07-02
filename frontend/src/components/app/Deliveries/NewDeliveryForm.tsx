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

export type NewDeliveryFormInputs = {
  productType: string;
  description: string;
  departure: string;
  destination: string;
  deliveryId: string;
  deviceID: string;
  email: string;
  constraints: any;
};

export const NewDeliverySchema = yup.object().shape({
  productType: yup
    .string()
    .typeError('Die Produktart muss angegeben werden.')
    .required('Die Produktart muss angegeben werden.'),
  description: yup
    .string()
    .typeError('Eine Beschreibung ist erforderlich.')
    .required('Eine Beschreibung ist erforderlich.'),
  departure: yup
    .string()
    .typeError('Der Startort muss angegeben werden.')
    .required('Der Startort muss angegeben werden.'),
  destination: yup
    .string()
    .typeError('Der Zielort muss angegeben werden.')
    .required('Der Zielort muss angegeben werden.'),
  deliveryId: yup
    .string()
    .typeError('Die Sendungsnummer muss angegeben werden.')
    .required('Die Sendungsnummer muss angegeben werden.'),
  email: yup
    .string()
    .typeError('Eine Email muss angegeben werden.')
    .required('Eine Email muss angegeben werden.'),
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
      console.log(dataRequest);
      const response = await axios.post(
        BACKEND_URL + '/public/tasks',
        dataRequest,
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    onCreateSubmit,
  };
};

export default NewDeliveryForm;