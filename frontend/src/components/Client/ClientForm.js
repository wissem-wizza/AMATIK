import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Chip,
  Divider,
  Grid,
  TextField,
  Paper,
  Stack,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";

import {
  useCreateClientMutation,
  useUpdateClientMutation
} from '../../features/client/extendedClientApi'; 
import {
  formFields,
  type_client,
  reglementList,
  regimeList,
  mapToDatabaseObject,
} from './formData';

const [
  civilité,
  nom,
  clé,
  email,
  adr_fact,
  adr_liv,
  telephone,
  portable,
  fax,
  simoc,
  agr_sanitaire,
  siret,
  reglement,
  TVA,
  COMPTE,
  regime,
  type,
] = formFields;

const ClientForm = () => {
  const LoaderData = useLoaderData();
    const {
        nouveau,
        labels,
        creationData = {},
        updatingData = {},
    } = LoaderData

    const [ createClient ] = useCreateClientMutation();
    const [ updateClient ] = useUpdateClientMutation();
    const navigate = useNavigate();

    const { toUpdate = {} } = updatingData
    const { nouveauClé } = creationData

  const defaultValues = { // editer || ajouter --> filled fields || empty fields
    [civilité]: labels.find((label) => label.code === toUpdate.TETE)?.code
      || labels[0].code,
    [nom]: toUpdate.NOM || '',
    [clé]: toUpdate.CLE || nouveauClé,
    [email]: toUpdate.EMAIL || '',
    [telephone]: toUpdate.TELEP || '',
    [portable]: toUpdate.portable || '',
    [fax]: toUpdate.FAX || '',
    [simoc]: toUpdate.VACHM || '',
    [agr_sanitaire]: toUpdate.agr_sanitaire || '',
    [siret]: toUpdate.SIRET || '',
    [reglement]: reglementList.find((option) => option.value === toUpdate.REGLEMENT)?.value
      || reglementList[0].value,
    [TVA]: toUpdate.TVA_intra || '',
    [COMPTE]: toUpdate.COMPTE || '',
    [regime]: regimeList.find((option) => option.value === toUpdate.REGIME_TVA)?.value
      || regimeList[0].value,
    [type]: type_client[toUpdate.type_client] || type_client[0],
  };

  if(!nouveau) {
    [toUpdate.ADR0, toUpdate.ADR1, toUpdate.ADR2].forEach(
      (adresse, i) => defaultValues[adr_fact[i]] = adresse);
    [toUpdate.ADRLIV0, toUpdate.ADRLIV1, toUpdate.ADRLIV2].forEach(
      (adresse, i) => defaultValues[adr_liv[i]] = adresse);
  }

  const {
    control,
    register,
    handleSubmit,
  } = useForm({
    reValidateMode: "onBlur",
    defaultValues,
  });

  const onSubmit = async data => {
    const formInputs = mapToDatabaseObject(data)
    try {
      if (nouveau) {
        await createClient({ ...formInputs, DATE_DERNIERE_FACTURE: dayjs() }).unwrap();
      } else {
        const { CLE: _cle, ...updatableFiels } = formInputs
        await updateClient({
          id: toUpdate._id,
          ...updatableFiels
        }).unwrap();
      }
      navigate("/client")
    } catch (error) {
      console.log("err", error)
    }
  }

  return (
    <Stack justifyContent="center" alignItems="center">
      <Paper
        sx={{ margin: "20px", padding: "50px", maxWidth: "max(80vw, 480px)" }}
        elevation={3}
      >
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          gap={2}
          width="max(70vw, 450px)"
        >
          <Typography variant="h5" textAlign="center" mb={5}>
            Enregistrement d'un Nouveau Client
          </Typography>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  control={control}
                  name={civilité}
                  render={({ field: { ref, value, onChange, ...field } }) => (
                    <Autocomplete
                      options={labels.map(label => label.code)}
                      getOptionLabel={(option) => {
                        return labels.find(label => label.code === option).libelle
                      }}
                      value={value}
                      onChange={(_, data) => {
                        onChange(data);
                      }}
                      renderInput={(params) => (
                        <TextField
                          color="success"
                          {...field}
                          {...params}
                          size="small"
                          inputRef={ref}
                          label="Civilité"
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <TextField
                  {...register(nom)}
                  color="success"
                  size="small"
                  label="Nom"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  {...register(clé)}
                  color="success"
                  size="small"
                  label="Clé"
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <TextField
                  {...register(email)}
                  color="success"
                  size="small"
                  label="Email"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          <Divider
            // textAlign="left"
            sx={{ width: "100%", marginBlock: "20px" }}
          >
            <Chip label="Adresses" />
          </Divider>

          <Grid
            item
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            gap={2}
            wrap="nowrap"
          >
            <Grid item>
              <Typography textAlign="center" mb={2}>
                Adresse de facturation
              </Typography>
              <Stack
                sx={{
                  width: "25ch",
                }}
                noValidate
                direction="column"
                autoComplete="off"
              >
                {adr_fact.map((_, i) => (
                  <TextField
                    {...register(adr_fact[i])}
                    color="success"
                    size="small"
                    hiddenLabel
                    key={i}
                  />
                ))}
              </Stack>
            </Grid>

            <Grid item>
              <Typography textAlign="center" mb={2}>
                Adresse de livraison
              </Typography>
              <Stack
                sx={{
                  width: "25ch",
                }}
                noValidate
                direction="column"
                autoComplete="off"
              >
                {adr_liv.map((_, i) => (
                  <TextField
                    {...register(adr_liv[i])}
                    color="success"
                    size="small"
                    hiddenLabel
                    key={i}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ width: "100%", marginBlock: "20px" }}>
            <Chip label="Contacts" />
          </Divider>

          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Grid item>
              <TextField
                {...register(telephone)}
                color="success"
                size="small"
                label="Téléphone"
                type="tel"
              />
            </Grid>

            <Grid item>
              <TextField
                {...register(portable)}
                color="success"
                size="small"
                label="Portable"
                type="tel"
              />
            </Grid>

            <Grid item>
              <TextField
                {...register(fax)}
                color="success"
                size="small"
                label="Fax"
                type="tel"
              />
            </Grid>
          </Grid>

          <Divider sx={{ width: "100%", marginBlock: "20px" }}>
            <Chip label="Identification" />
          </Divider>

          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Grid item>
              <TextField
                {...register(simoc)}
                color="success"
                size="small"
                label="Type SIMOC"
                type="tel"
              />
            </Grid>

            <Grid item>
              <TextField
                {...register(agr_sanitaire)}
                color="success"
                size="small"
                label="Agr sanitaire / exploitation"
                type="tel"
              />
            </Grid>

            <Grid item>
              <TextField
                {...register(siret)}
                color="success"
                size="small"
                label="Siret"
                type="tel"
              />
            </Grid>
          </Grid>

          <Divider
            sx={{ width: "100%", marginTop: "50px", marginBottom: "20px" }}
          >
            <Chip label="Informations financières" />
          </Divider>

          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={3}>
              <Controller
                control={control}
                name={reglement}
                render={({ field: { ref, value, onChange, ...field } }) => (
                  <Autocomplete
                    options={reglementList.map((item) => item.value)}
                    getOptionLabel={(option) => option.toLowerCase()}
                    value={value}
                    onChange={(_, data) => {
                      onChange(data);
                    }}
                    renderInput={(params) => (
                      <TextField
                        color="success"
                        {...field}
                        {...params}
                        size="small"
                        inputRef={ref}
                        label="Règlement"
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                {...register(TVA)}
                color="success"
                size="small"
                label="TVA"
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                {...register(COMPTE)}
                color="success"
                size="small"
                label="Compte"
              />
            </Grid>

            <Grid item xs={3}>
              <Controller
                control={control}
                name={regime}
                render={({ field: { ref, value, onChange, ...field } }) => (
                  <Autocomplete
                    options={regimeList.map((item) => item.value)}
                    getOptionLabel={(option) => option}
                    value={value}
                    onChange={(_, data) => {
                      onChange(data);
                    }}
                    renderInput={(params) => (
                      <TextField
                        color="success"
                        {...field}
                        {...params}
                        size="small"
                        inputRef={ref}
                        label="Régime"
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <FormControl>
              <Stack
                justifyContent="center"
                alignItems="center"
                direction="row"
                flexWrap="nowrap"
                spacing={3}
                sx={{ marginBlockStart: 5 }}
              >
                <FormLabel id="demo-radio-buttons-group-label">
                  Type de Client
                </FormLabel>
                <Controller
                  name={type}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }, formState, }) => (
                    <RadioGroup
                      row
                      value={value}
                      onChange={(e, data) => {
                        onChange(e, data)
                      }}
                    >
                      {type_client.map((type, i) => (
                        <FormControlLabel
                          key={i}
                          value={type}
                          control={<Radio color="success" />}
                          label={type}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </Stack>
            </FormControl>
          </Grid>

          <Grid
            item
            container
            alignSelf="stretch"
            justifyContent="end"
            alignItems="center"
            wrap="nowrap"
            gap={2}
            marginTop={5}
          >
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  color: "gray",
                  borderColor: "gray",
                  ":hover": { color: "#333", borderColor: "#333" },
                }}
              >
                Annuler
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                sx={{ marginInlineEnd: 15 }}
                onClick={handleSubmit(onSubmit)}
              >
                Soumettre
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default ClientForm;
