import Joi from 'joi';

process.loadEnvFile();

export default class EnvConfig {
  private envVars: { [key: string]: string | undefined } = {};

  constructor() {
    this.envVars = this.validateEnvVars();
  }

  get env(): { [key: string]: string | undefined } {
    return this.envVars;
  }

  public validateEnvVars(): { [key: string]: string | undefined } {
    const envVarsSchema = Joi.object({
      PORT: Joi.number(),
      MONGO_URI: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRES_IN: Joi.string().required(),
      JWT_ISSUER: Joi.string().required(),
    })
      .unknown()
      .required();

    const { value: envVars, error } = envVarsSchema.validate(process.env);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return envVars;
  }
}
