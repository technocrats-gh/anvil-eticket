function PageNotFound() {
    return (
        <div class="layout-wrapper layout-wrapper-light">
            <div class="layout-content">
                <div class="block-section">
                    <div class="block-header">
                        <span class="block-title">
                            <span>Illustration</span>
                        </span>
                        <div class="block-actions">
                            <a tabindex="0" class="block-action-active">
                                <span>Preview</span>
                            </a>
                            <a class="block-action-disabled p-disabled" disabled="">
                                <i class="pi pi-lock"></i>
                                <span>Code</span>
                            </a>
                            <a disabled="" class="block-action-copy block-action-disabled p-disabled">
                                <i class="pi pi-copy"></i>
                            </a>
                        </div>
                    </div>
                    <div class="block-content">
                        <div>
                            <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
                                <div class="flex flex-column lg:flex-row justify-content-center align-items-center gap-7">
                                    <div class="text-center lg:text-right">
                                        <div class="mt-6 mb-3 font-bold text-6xl text-900">Are you lost?</div>
                                        <p class="text-700 text-3xl mt-0 mb-6">Sorry, we could not find the page.</p>
                                        <button aria-label="Go back to home page" type="button" class="p-button p-component p-button-outlined">
                                            <span class="p-button-label p-c">Go back to home page</span>
                                            <span role="presentation" class="p-ink"></span>
                                        </button>
                                    </div>
                                    <div>
                                        <img src="/demo/images/blocks/feedback/404-rocket.png" alt="Image" class="w-full md:w-28rem" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
