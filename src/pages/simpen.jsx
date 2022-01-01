<div>
                        <Button
                            color="primary"
                            id="toggler"
                            style={{
                                marginBottom: '1rem'
                            }}
                        >
                            Toggle
                        </Button>
                        <UncontrolledCollapse toggler="#toggler">
                            <Row>
                                <Button type="button" color="success" onClick={() => setModalOpen(true)}>Add</Button>
                            </Row>
                            <FormGroup>
                                <Label>Nama</Label>
                                <Input type="text" id="text" placeholder="Cari produk"
                                     />
                            </FormGroup>
                            <FormGroup>
                                <Label>Harga</Label>
                                <div className="d-flex">
                                    <Input type="number" id="numb1" placeholder="Minimum"
                                        onChange={ (text)=>setInput(text.target.value) } />
                                    <Input type="number" id="numb2" placeholder="Maksimum"
                                         />
                                    {console.log(input)}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Sort</Label>
                                <InputGroup>
                                    <Input type="select" style={{ width: "250px" }}
                                    >
                                        {/* innerRef={(element) => this.inSearchSort = element} */}
                                        <option value="harga-asc">Harga Asc</option>
                                        <option value="harga-desc">Harga Desc</option>
                                        <option value="nama-asc">A-Z</option>
                                        <option value="nama-desc">Z-A</option>
                                        <option value="id-asc">Reset</option>
                                    </Input>
                                </InputGroup>
                                <div className="pt-2" style={{ textAlign: "end" }}>
                                    <Button outline color="warning" >Reset</Button>
                                    <Button style={{ marginLeft: 16 }} color="primary" >Filter</Button>
                                </div>
                            </FormGroup>
                        </UncontrolledCollapse>
                    </div>
                    // <tr>
                    //             <td scope="row"></td>
                    //             <td>Mark</td>
                    //             <td>Otto</td>
                    //             <td>@mdo</td>
                    //         </tr>
                    //         <tr>
                    //             <td scope="row"></td>
                    //             <td>Jacob</td>
                    //             <td>Thornton</td>
                    //             <td>@fat</td>
                    //         </tr>
                    //         <tr>
                    //             <th scope="row">
                    //                 3
                    //             </th>
                    //             <td>
                    //                 Larry
                    //             </td>
                    //             <td>
                    //                 the Bird
                    //             </td>
                    //             <td>
                    //                 @twitter
                    //             </td>
                    //         </tr>
