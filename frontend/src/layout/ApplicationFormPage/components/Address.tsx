
import React from 'react'
import { AddressInfo } from '../../../models/ApplicationPayLoad';

interface AddressProps{
    addressInfo: AddressInfo;
    onChange: (field: keyof AddressInfo, value: string) => void;
    handleBlur: (field: string, value: string) => void;
    errors: {[key: string]: string};
    isSubmitting: boolean;
}

export const Address: React.FC<AddressProps> = (props) => {
    return (
        <div className='mt-3 col-12 col-lg-8'>
            <fieldset className='border rounded-3 p-4 shadow'>
                <legend className='float-none w-auto px-3 py-1 mb-0 fs-6  text-secondary bg-light border rounded'>
                    Address
                </legend>
                <div className='mb-3'>
                    <div className="form-floating mb-2">
                        <input type="text" className={`form-control ${props.errors.street && props.isSubmitting ? 'is-invalid' : ''}`} id="floatingStreetAddress" 
                        onChange={(e)=> props.onChange(e.target.name as keyof AddressInfo, e.target.value)}
                        value={props.addressInfo.street}
                        name='street'
                        onBlur={(e) => props.handleBlur(e.target.name, props.addressInfo.street)}
                        placeholder="Street Address" />
                        <label className='required' htmlFor="floatingStreetAddress">Street Address</label>
                        {props.errors.street && <div className="text-danger mt-1">{props.errors.street}</div>}
                    </div>
                    <div className="form-floating mb-2">
                        <input type="text" className={`form-control ${props.errors.city && props.isSubmitting ? 'is-invalid' : ''}`} id="floatingCity" 
                        onChange={(e)=> props.onChange(e.target.name as keyof AddressInfo, e.target.value)}
                        value={props.addressInfo.city}
                        name='city'
                        onBlur={(e) => props.handleBlur(e.target.name, props.addressInfo.city)}
                        placeholder="City" />
                        <label className='required' htmlFor="floatingCity">City</label>
                        {props.errors.city && <div className="text-danger mt-1">{props.errors.city}</div>}
                    </div>
                    <div className="form-floating mb-2">
                        <input type="text"  className={`form-control ${props.errors.provinceOrState && props.isSubmitting ? 'is-invalid' : ''}`} id="floatingProvince/State"
                        onChange={(e)=> props.onChange(e.target.name as keyof AddressInfo, e.target.value)}
                        value={props.addressInfo.provinceOrState}
                        name='provinceOrState'
                        onBlur={(e) => props.handleBlur(e.target.name, props.addressInfo.provinceOrState)}
                        placeholder="Province/State" />
                        <label className='required' htmlFor="floatingProvince/State">Province/State</label>
                        {props.errors.provinceOrState && <div className="text-danger mt-1">{props.errors.provinceOrState}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"  className={`form-control ${props.errors.postalCode && props.isSubmitting ? 'is-invalid' : ''}`} id="floatingPostalCode" 
                        onChange={(e)=> props.onChange(e.target.name as keyof AddressInfo, e.target.value)}
                        value={props.addressInfo.postalCode}
                        name='postalCode'
                        onBlur={(e) => props.handleBlur(e.target.name, props.addressInfo.postalCode)}
                        placeholder="Postal Code" />
                        <label className='required' htmlFor="floatingPostalCode">Postal Code</label>
                        {props.errors.postalCode && <div className="text-danger mt-1">{props.errors.postalCode}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingCountry"
                        onChange={(e)=> props.onChange(e.target.name as keyof AddressInfo, e.target.value)}
                        value={props.addressInfo.country}
                        name='country'
                        placeholder="Country" />
                        <label htmlFor="floatingCountry">Country</label>
                    </div>
                </div>
            </fieldset>
        </div>   

    )
}





